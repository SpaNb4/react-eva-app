import React, { MouseEventHandler } from 'react';
import classes from './Ceo.module.scss';

interface ICeoProps {
    name: string | undefined;
    birthday: string | undefined;
    race: string | undefined;
    leftArrowClickHandler: MouseEventHandler<HTMLSpanElement>;
}

export default function Ceo({ name, birthday, race, leftArrowClickHandler }: ICeoProps) {
    const arrowCls = [classes.Link, classes.LeftArrow];

    return (
        <div className={classes.Corporation}>
            <h3>Name - {name}</h3>
            <div>Birthday - {new Date(Date.parse(birthday!)).toLocaleString('en-us')}</div>
            <div>Race - {race}</div>
            <span className={arrowCls.join(' ')} onClick={leftArrowClickHandler}>
                &#8592;
            </span>
        </div>
    );
}
