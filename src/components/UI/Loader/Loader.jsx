import React from 'react';
import cl from './Loader.module.css'

const Loader = (props) => {
    return (
        <div className={cl.center}>
            <div className={cl.Loader}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;