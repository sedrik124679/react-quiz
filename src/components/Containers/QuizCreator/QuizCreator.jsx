import React, {Component} from 'react';
import cl from './QuizCreator.module.sass'
import MyButton from "../../UI/MyButton/MyButton";
import {createControl, validate, validateForm} from '../../FormFramework/formFramework';
import MyInput from "../../UI/MyInput/MyInput";
import MySelect from "../../UI/MySelect/MySelect";
import {createQuizQuestion, finishCreateQuiz} from "../../../Store/Actions/Create";
import {connect} from "react-redux";

function createOptionControl(number) {
    return createControl({
        label: `Option ${number}`,
        errorMessage: 'Value is not be empty',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Enter a question',
            errorMessage: 'Question is not be empty'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    addQuestionHandler = (event) => {

        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    createQuizHandler = (event) => {

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
        this.props.finishCreateQuiz()
    }

ChangeHandler = (value, controlName) => {

    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
        formControls,
        isFormValid: validateForm(formControls)
    })
}

selectChangeHandler = (event) => {
    this.setState({
        rightAnswerId: +event.target.value
    })
}

renderControls()
{
    return Object.keys(this.state.formControls).map((controlName, index) => {
        const control = this.state.formControls[controlName];
        return (
            <React.Fragment key={controlName + index}>
                <MyInput key={index}
                         label={control.label}
                         value={control.value}
                         valid={control.valid}
                         shouldValidate={!!control.validation}
                         touched={control.touched}
                         errorMessage={control.errorMessage}
                         onChange={(event) => {
                             this.ChangeHandler(event.target.value, controlName)
                         }}/>
                {index === 0 ? <hr/> : null}
            </React.Fragment>
        )
    })
}

render()
{
    const select = <MySelect label='Choose a true answer'
                             value={this.state.rightAnswerId}
                             onChange={this.selectChangeHandler}
                             options={[
                                 {text: 1, value: 1},
                                 {text: 2, value: 2},
                                 {text: 3, value: 3},
                                 {text: 4, value: 4}
                             ]}/>
    return (
        <div className={cl.QuizCreator}>
            <div>
                <h1>Створення тесту</h1>

                <form onSubmit={this.submitHandler}>

                    {this.renderControls()}

                    {select}
                    <MyButton type='primary'
                              onClick={this.addQuestionHandler}
                              disabled={!this.state.isFormValid}>Add question</MyButton>
                    <MyButton type='success'
                              onClick={this.createQuizHandler}
                              disabled={this.props.quiz.length === 0}>Create test</MyButton>

                </form>
            </div>
        </div>
    )
}
}
;

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)