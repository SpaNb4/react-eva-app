import React from 'react';
import classes from './Modal.module.scss';

interface IModalProps {
    children: JSX.Element;
    isActive: boolean;
    setIsModalActive: Function;
}

export default function Modal({ children, isActive, setIsModalActive }: IModalProps) {
    const clsModal = [classes.Modal];
    const clsBlackout = [classes.Blackout];

    if (isActive) {
        clsModal.push(classes.Active);
        clsBlackout.push(classes.Active);
    }

    function closeBtnClickHandler() {
        setIsModalActive(false);
    }

    return (
        <>
            <div className={clsModal.join(' ')}>
                <div>{children}</div>
                <span onClick={closeBtnClickHandler} className={classes.CloseBtn}>
                    &#10006;
                </span>
            </div>
            <span onClick={closeBtnClickHandler} className={clsBlackout.join(' ')}></span>
        </>
    );
}
