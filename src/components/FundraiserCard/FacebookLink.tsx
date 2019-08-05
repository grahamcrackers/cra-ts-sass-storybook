import React, { FC } from 'react';
import IconButton from '../../material/icon-button';

interface FacebookLinkProps {
    link: string;
}

const FacebookIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 172 172"
            style={{ fill: '#000000' }}
        >
            <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: 'normal' }}
            >
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g fill="#324d8f">
                    <path d="M125.59583,64.5h-25.2625v-14.33333c0,-7.396 0.602,-12.05433 11.2015,-12.05433h13.38733v-22.79c-6.5145,-0.67367 -13.06483,-1.00333 -19.62233,-0.989c-19.44317,0 -33.63317,11.87517 -33.63317,33.67617v16.4905h-21.5v28.66667l21.5,-0.00717v64.50717h28.66667v-64.5215l21.973,-0.00717z"></path>
                </g>
            </g>
        </svg>
    );
};

export const FacebookLink: FC<FacebookLinkProps> = ({ link }) => {
    return (
        <IconButton href={link}>
            <FacebookIcon />
        </IconButton>
    );
};
