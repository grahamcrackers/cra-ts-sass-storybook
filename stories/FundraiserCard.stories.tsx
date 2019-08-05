import { storiesOf } from '@storybook/react';

import React from 'react';
import { FundraiserDTO } from '../src/models/FundraiserDTO';
import { FundraiserCard } from '../src/components/FundraiserCard/FundraiserCard';

storiesOf('Fundraiser Card', module).add('Card', () => {
    const name = 'Graham Rogers';

    const person: FundraiserDTO = {
        id: '1234567890',
        title: `${name} for St. Jude Children's Research Hospital`,
        campaignOwnerName: name,
        skipped: false,
        thanked: false,
        manualNeeded: false,
        chargeDate: Date.now().toString(),
        amountRaised: undefined,
        goal: undefined,
        daysLeft: undefined,
        language: undefined,
        observation: undefined,
        story: undefined,
        invited: undefined,
    };

    const messages = [
        {
            id: 14,
            text: 'en, active:false, goalMet:false',
            language: 'en',
            type: {
                id: 1,
                isActive: false,
                isGoalMet: false,
                hasTwelveHoursLeft: false,
                hasThreeDaysLeft: false,
            },
        },
        {
            id: 15,
            text: 'en, active:false, goalMet:true',
            language: 'en',
            type: {
                id: 2,
                isActive: false,
                isGoalMet: true,
                hasTwelveHoursLeft: false,
                hasThreeDaysLeft: false,
            },
        },
        {
            id: 16,
            text: 'en, active:true, goalMet:false, hasTwelveHoursLeft:true',
            language: 'en',
            type: {
                id: 3,
                isActive: true,
                isGoalMet: false,
                hasTwelveHoursLeft: true,
                hasThreeDaysLeft: false,
            },
        },
        {
            id: 17,
            text: 'en, active:true, goalMet:false, hasTwelveHoursLeft:false',
            language: 'en',
            type: {
                id: 4,
                isActive: true,
                isGoalMet: false,
                hasTwelveHoursLeft: false,
                hasThreeDaysLeft: false,
            },
        },
        {
            id: 12,
            text: 'en, active:true, goalMet:true, hasThreeDaysLeft:true',
            language: 'en',
            type: {
                id: 5,
                isActive: true,
                isGoalMet: true,
                hasTwelveHoursLeft: false,
                hasThreeDaysLeft: true,
            },
        },
        {
            id: 121234,
            text: 'en, active:true, goalMet:true, hasThreeDaysLeft:false',
            language: 'en',
            type: {
                id: 6,
                isActive: true,
                isGoalMet: true,
                hasTwelveHoursLeft: false,
                hasThreeDaysLeft: false,
            },
        },
    ];
    return <FundraiserCard fundraiser={person} messages={messages} />;
});
