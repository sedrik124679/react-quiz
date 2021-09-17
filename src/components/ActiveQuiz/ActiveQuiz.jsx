import React from 'react';
import cl from './ActiveQuiz.module.css';
import AnswersList from "./AnswerList/AnswersList";

const ActiveQuiz = (props) => {
    return (
        <div className={cl.activeQuiz}>
            <p className={cl.Question}>
                <span>
                    <strong>{props.answerNumber}.</strong>&nbsp;
                    {props.question}
                </span>
                <small>{props.answerNumber} з {props.quizLength}</small>
            </p>
            <AnswersList
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                state={props.state}/>
        </div>
    );
};

export default ActiveQuiz;