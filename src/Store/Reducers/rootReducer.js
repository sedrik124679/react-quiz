import {combineReducers} from "redux";
import quizReducer from './Quiz';
import createReducer from "./Create";
import authReducer from "./auth";

export default combineReducers({
    quiz: quizReducer,
    create: createReducer,
    auth: authReducer
})