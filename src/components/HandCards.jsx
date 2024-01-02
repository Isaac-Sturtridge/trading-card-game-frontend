import { useState } from 'react';
import { HandCard } from './HandCard';

export const HandCards = ({handCards}) => {
    
    return (
        <>
        <h1>Hand cards</h1>
        {handCards.map((card) => {
            <HandCard key={card}/>
        })}
        </>
    )
}

