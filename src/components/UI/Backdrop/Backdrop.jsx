import React from 'react';
import cl from './Backdrop.module.css'

const Backdrop = (props) => {
    return (
        <div className={cl.Backdrop} onClick={props.onClick}>

        </div>
    );
};

export default Backdrop;