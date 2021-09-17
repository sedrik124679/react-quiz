import React from 'react';
import cl from './AnswerItem.module.css';

const AnswerItem = (props) => {
    const cls = [cl.AnswerItem]

    if(props.state){
        cls.push(cl[props.state])
    }

    return (
        <li className={cls.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}>
            {props.answer.text}
        </li>
    );
};

export default AnswerItem;