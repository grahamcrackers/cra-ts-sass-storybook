import React, { FC, useState } from 'react';
import { FundraiserDTO } from '../../models/FundraiserDTO';
import { Headline5, Subtitle2 } from '../../material/typography';
import './fundraiser-card.scss';

import Radio, { NativeRadioControl } from '../../material/radio';
import Switch from '../../material/switch';
import { Button } from '../../material/button';
import IconButton from '../../material/icon-button';
import MaterialIcon from '../../material/material-icon';
import { FacebookLink } from './FacebookLink';
import { MessageDTO } from '../../models/MessageDTO';

type LanguageOptions = 'en' | 'sp';

interface FundraiserCardProps {
    fundraiser: FundraiserDTO;
    messages: MessageDTO[];
}

interface FundraiserCardState {
    isActive: boolean;
    isGoalMet: boolean;
    hasThreeDaysLeft: boolean;
    hasTwelveHoursLeft: boolean;
    language: LanguageOptions;
    thanked: boolean;
    skipped: boolean;
}

export const FundraiserCard: FC<FundraiserCardProps> = ({ fundraiser, messages }) => {
    const link = `https://www.facebook.com/donate/${fundraiser.id}`;

    const [state, setState] = useState<FundraiserCardState>({
        isActive: true,
        isGoalMet: false,
        hasThreeDaysLeft: false,
        hasTwelveHoursLeft: false,
        language: 'en',
        thanked: false,
        skipped: false,
    });

    /**
     * Match a message based on the criteria that is seleted
     */
    const matchMessage = async (language: LanguageOptions): Promise<string> => {
        const languageMessages = messages.filter((message: MessageDTO) => {
            if (message.language === language) {
                return message;
            }
        });

        const matched = languageMessages.filter((message: MessageDTO) => {
            const { isActive, isGoalMet, hasTwelveHoursLeft, hasThreeDaysLeft } = message.type;
            if (
                state.isActive === isActive &&
                state.isGoalMet === isGoalMet &&
                state.hasTwelveHoursLeft === hasTwelveHoursLeft &&
                state.hasThreeDaysLeft === hasThreeDaysLeft
            ) {
                return message;
            }
        });

        // Get the text out of the message object
        return matched[0].text;
    };

    /**
     * Copy text to the clipboard, uses the new navigator object in chrome
     */
    const copyToClipboard = async (language: LanguageOptions) => {
        try {
            let matchedText = await matchMessage(language);
            // Will replace [NAME] in the message text if the campaign owner name exists
            if (fundraiser.campaignOwnerName) {
                matchedText = matchedText.replace(/\[name\]/gi, fundraiser.campaignOwnerName);
            }
            await navigator.clipboard.writeText(matchedText);
            console.log('Async: Copying to clipboard was successful!');
        } catch (error) {
            console.error('Async: Could not copy text: ', error);
        }
    };

    const checkForLanguage = (language: LanguageOptions): boolean => {
        const messagesForLanguage = messages.filter(message => message.language === language);
        const numberOfMessages = messagesForLanguage.length;

        return numberOfMessages > 0 ? false : true;
    };

    return (
        <div className="mdc-card fundraiser-card">
            <div className="card-header">
                <div className="card-title">
                    <Headline5>{fundraiser.campaignOwnerName}</Headline5>
                    <Subtitle2>{fundraiser.title}</Subtitle2>
                </div>
                <div className="fundraiser-link">
                    <FacebookLink link={link} />
                </div>
            </div>
            <div className="fundraiser-card__switches">
                <div className="mdc-form-field">
                    <label htmlFor="isActive">Is Active</label>
                    <Switch
                        disabled={messages.length === 0}
                        nativeControlId="isActive"
                        checked={state.isActive}
                        onClick={() => {
                            setState({
                                ...state,
                                // If not active, 3 days and 12 hours should be false
                                isActive: !state.isActive,
                                hasThreeDaysLeft: !state.isActive && false,
                                hasTwelveHoursLeft: !state.isActive && false,
                            });
                        }}
                    />
                </div>
                <div className="mdc-form-field">
                    <label htmlFor="isGoalMet">Goal Met</label>
                    <Switch
                        disabled={messages.length === 0}
                        nativeControlId="isGoalMet"
                        checked={state.isGoalMet}
                        onClick={() => {
                            setState({
                                ...state,
                                isGoalMet: !state.isGoalMet,
                                hasTwelveHoursLeft: state.isGoalMet && false,
                                hasThreeDaysLeft: !state.isGoalMet && false,
                            });
                        }}
                    />
                </div>
                <div className="mdc-form-field">
                    <label htmlFor="hasTwelveHoursLeft">12 Hours Left</label>
                    <Switch
                        disabled={messages.length === 0 || !state.isActive || state.isGoalMet}
                        nativeControlId="hasTwelveHoursLeft"
                        checked={state.hasTwelveHoursLeft}
                        onClick={() => {
                            setState({ ...state, hasTwelveHoursLeft: !state.hasTwelveHoursLeft });
                        }}
                    />
                </div>
                <div className="mdc-form-field">
                    <label htmlFor="hasThreeDaysLeft">3 Days Left</label>
                    <Switch
                        disabled={messages.length === 0 || !state.isActive || !state.isGoalMet}
                        nativeControlId="hasThreeDaysLeft"
                        checked={state.hasThreeDaysLeft}
                        onClick={() => setState({ ...state, hasThreeDaysLeft: !state.hasThreeDaysLeft })}
                    />
                </div>
            </div>
            <div className="fundraiser-card_language-radio">
                <Radio label="English" key="en">
                    <NativeRadioControl
                        name="language"
                        value="en"
                        id="en"
                        onChange={e => setState({ ...state, language: 'en' })}
                        defaultChecked={state.language === 'en'}
                        disabled={checkForLanguage('en')}
                    />
                </Radio>
                <Radio label="Spanish" key="sp">
                    <NativeRadioControl
                        name="language"
                        value="sp"
                        id="sp"
                        onChange={e => setState({ ...state, language: 'sp' })}
                        defaultChecked={state.language === 'sp'}
                        disabled={checkForLanguage('sp')}
                    />
                </Radio>
            </div>
            <div className="mdc-card__actions">
                <div className="mdc-card__action-buttons">
                    <Button
                        onClick={() => {
                            matchMessage(state.language);
                        }}
                    >
                        Copy Message
                    </Button>
                </div>
                <div className="mdc-card__action-icons">
                    <IconButton onClick={() => setState({ ...state, thanked: true })}>
                        {!state.thanked ? (
                            <MaterialIcon icon="done" />
                        ) : (
                            <MaterialIcon icon="done_outline" style={{ color: 'green' }} />
                        )}
                    </IconButton>
                    <IconButton onClick={() => setState({ ...state, skipped: true })}>
                        <MaterialIcon icon="clear" />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};
