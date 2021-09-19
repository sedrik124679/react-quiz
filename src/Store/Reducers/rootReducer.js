import {combineReducers} from "redux";
import quizReducer from './Quiz';

export default combineReducers({
    quiz: quizReducer
})