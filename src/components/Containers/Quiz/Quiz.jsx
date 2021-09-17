import React, {Component} from 'react';
import cl from './Quiz.module.css';
import ActiveQuiz from "../../ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../FinishedQuiz/FinishedQuiz";
import axios from '../../../Axios/Axios-quiz';
import Loader from "../../UI/Loader/Loader";

class Quiz extends Component {

    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
    }

    onAnswerClickHandler = (answerId) => {
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0];
            if(this.state.answerState[key] === 'success'){
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            if(!results[question.id]){
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            })

            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout);
            }, 1000)
        } else {
            results[question.id] = 'fail';
            this.setState({
                answerState: {[answerId]: 'fail'},
                results: results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    async componentDidMount() {
        console.log(this.props.match.params.id);
        try{
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
            const quiz = response.data;
            this.setState({
                quiz, loading: false
            })
        } catch (e){
            console.log(e)
        }
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            result: {}
        })
    }

    render() {
        return (
            <div className={cl.Quiz}>
                <div className={cl.QuizWrapper}>
                    <h1>Дайте відповідь на всі запитання</h1>
                    {this.state.loading
                        ? <Loader />
                        : this.state.isFinished
                                ? <FinishedQuiz
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    onRetry={this.retryHandler}/>
                                : <ActiveQuiz answers={this.state.quiz[this.state.activeQuestion].answers}
                                              question={this.state.quiz[this.state.activeQuestion].question}
                                              onAnswerClick={this.onAnswerClickHandler}
                                              quizLength={this.state.quiz.length}
                                              answerNumber={this.state.activeQuestion + 1}
                                              state={this.state.answerState}/>}

                </div>
            </div>
        )
    }
}

export default Quiz;