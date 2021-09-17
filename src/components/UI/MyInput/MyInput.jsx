import React from 'react';
import cl from './MyInput.module.sass'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const MyInput = (props) => {

    const inputType = props.type || 'text'
    const cls = [cl.MyInput]
    const htmlFor = `${inputType}—${Math.random()}`

    if (isInvalid(props)) {
        cls.push(cl.invalid)
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input type={inputType}
                   id={htmlFor}
                   value={props.value}
                   onChange={props.onChange}/>

            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'pls enter a true value'}</span>
                    : null
            }
        </div>
    );
};

export default MyInput;