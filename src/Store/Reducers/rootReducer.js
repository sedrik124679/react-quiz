import {combineReducers} from "redux";
import quizReducer from './Quiz';
import createReducer from "./Create";

export default combineReducers({
    quiz: quizReducer,
    create: createReducer
})