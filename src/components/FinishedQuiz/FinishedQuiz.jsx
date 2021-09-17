import React from 'react';
import cl from './FinishedQuiz.module.css';
import MyButton from "../UI/MyButton/MyButton";
import {Link} from "react-router-dom";

const FinishedQuiz = (props) => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if ( props.results[key] === 'success'){
            total++
        }
        return total
    }, 0)

    return (
        <div className={cl.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'fail' ? 'fa-times' : 'fa-check',
                        cl[props.results[quizItem.id]]
                    ]
                    return(
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul>
            <p>Правильних {successCount} з {props.quiz.length}</p>
            <div>
                <MyButton onClick={props.onRetry} type='primary'>Повторити</MyButton>
                <Link to='/'>
                    <MyButton type='success'>Перейти в список тестів</MyButton>
                </Link>
            </div>
        </div>
    );
};

export default FinishedQuiz;