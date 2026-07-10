import React from 'react';

export const IndianTeam=[
    'Sachin1',
    'Dhoni2',
    'Virat3',
    'Rohit4',
    'Yuvraj5',
    'Raina6'
];

export function OddPlayers({team}){

    const [first,,third,,fifth]=team;

    return(
        <ul>
            <li>First : {first}</li>
            <li>Third : {third}</li>
            <li>Fifth : {fifth}</li>
        </ul>
    );
}

export function EvenPlayers({team}){

    const [,second,,fourth,,sixth]=team;

    return(
        <ul>
            <li>Second : {second}</li>
            <li>Fourth : {fourth}</li>
            <li>Sixth : {sixth}</li>
        </ul>
    );
}

const T20Players=[
    'First Player',
    'Second Player',
    'Third Player'
];

const RanjiTrophyPlayers=[
    'Fourth Player',
    'Fifth Player',
    'Sixth Player'
];

export const IndianPlayers=[...T20Players,...RanjiTrophyPlayers];

function ListofIndianPlayers({players}){
    return(
        <ul>
            {players.map((player,index)=>(
                <li key={index}>Mr. {player}</li>
            ))}
        </ul>
    );
}

export default ListofIndianPlayers;