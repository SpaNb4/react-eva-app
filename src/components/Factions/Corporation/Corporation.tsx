import React, { MouseEventHandler } from 'react';
import classes from './Corporation.module.scss';

interface ICorporationProps {
    description: string | undefined;
    member_count: number | undefined;
    name: string | undefined;
    ceoName: string | undefined;
    ceoNameClickHandler: MouseEventHandler<HTMLButtonElement>;
}

export default function Corporation({
    name,
    member_count,
    description,
    ceoName,
    ceoNameClickHandler,
}: ICorporationProps) {
    return (
        <div className={classes.Corporation}>
            <h3>Corporation name - {name}</h3>
            <div>Member count - {member_count}</div>
            <p className={classes.Description}>{description}</p>
            <div>
                <span>Ceo name - </span>
                <span onClick={ceoNameClickHandler} className={classes.Link}>
                    {ceoName}
                </span>
            </div>
        </div>
    );
}
