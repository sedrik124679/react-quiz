import React, {Component} from 'react';
import Layout from "./components/hoc/Layout/Layout";
import Quiz from "./components/Containers/Quiz/Quiz";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import QuizCreator from "./components/Containers/QuizCreator/QuizCreator";
import Auth from "./components/Containers/Auth/Auth";
import QuizList from "./components/Containers/QuizList/QuizList";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./Store/Actions/auth";

class App extends Component {
    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/auth' component={Auth}/>
                <Route path='/quiz/:id' component={Quiz}/>
                <Route path='/' component={QuizList}/>
                <Redirect to={'/'}/>
            </Switch>
        )
        if (this.props.isAuthorize) {
            routes = (
                <Switch>
                    <Route path='/quiz-creator' component={QuizCreator}/>
                    <Route path='/quiz/:id' component={Quiz}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/' component={QuizList}/>
                    <Redirect to={'/'}/>
                </Switch>
            )
        }

        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthorize: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
