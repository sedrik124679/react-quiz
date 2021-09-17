import React from 'react';
import Layout from "./components/hoc/Layout/Layout";
import Quiz from "./components/Containers/Quiz/Quiz";
import {Switch, Route} from 'react-router-dom';
import QuizCreator from "./components/Containers/QuizCreator/QuizCreator";
import Auth from "./components/Containers/Auth/Auth";
import QuizList from "./components/Containers/QuizList/QuizList";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path='/auth' component={Auth}/>
                <Route path='/quiz-creator' component={QuizCreator}/>
                <Route path='/quiz/:id' component={Quiz}/>
                <Route path='/' component={QuizList}/>
            </Switch>
        </Layout>
    );
}

export default App;
