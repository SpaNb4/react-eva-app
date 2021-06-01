import React from 'react';
import classes from './Modal.module.scss';

interface IModalProps {
    children: JSX.Element;
}

export default function Modal({ children }: IModalProps) {
    return <div className={classes.Modal}>{children}</div>;
}
