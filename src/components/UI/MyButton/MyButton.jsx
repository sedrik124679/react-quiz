import React from 'react';
import cl from './MyButton.module.css';

const MyButton = (props) => {
    const cls = [
        cl.myButton,
        cl[props.type]
    ]
    return (
        <button className={cls.join(' ')}
                onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default MyButton;