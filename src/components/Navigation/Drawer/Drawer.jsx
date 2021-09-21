import React, {Component} from 'react';
import cl from './Drawer.module.css';
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={cl.active}
                        onClick={this.clickHandler}>
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }


    render() {

        const cls = [cl.Drawer];

        if (!this.props.isOpen) {
            cls.push(cl.close)
        }

        const links = [
            {to: '/', label: 'Lists', exact: true}
        ];

        if(this.props.isAuthorize) {
            links.push({to: '/quiz-creator', label: 'Create test', exact: false})
            links.push({to: '/logout', label: 'Exit from account', exact: false},)
        } else {
            links.push({to: '/auth', label: 'Authorization', exact: false})
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
            </React.Fragment>
        )
    }
}

export default Drawer;