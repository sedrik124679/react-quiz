import React from 'react';
import cl from './MySelect.module.sass'

const MySelect = (props) => {

    const htmlFor = `${props.label}-${Math.random()}`;

    return (
        <div className={cl.MySelect}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select id={htmlFor}
                    value={props.value}
                    onChange={props.onChange}>{ props.options.map((option, index) => {
                        return(
                            <option value={option.value}
                                    key={option.value + index}>{option.text}</option>
                        )
            }) }</select>
        </div>
    );
};

export default MySelect;