import React, { MouseEventHandler } from 'react';
import classes from './Ceo.module.scss';

interface ICeoProps {
    name: string | undefined;
    birthday: string | undefined;
    race: string | undefined;
    leftArrowClickHandler: MouseEventHandler<HTMLSpanElement>;
}

export default function Ceo({ name, birthday, race, leftArrowClickHandler }: ICeoProps) {
    return (
        <div className={classes.Corporation}>
            <h3>Name - {name}</h3>
            <div>Birthday - {new Date(Date.parse(birthday!)).toLocaleString('en-us')}</div>
            <div>Race - {race}</div>
            <span className={classes.Link} onClick={leftArrowClickHandler}>
                &#8592;
            </span>
        </div>
    );
}
