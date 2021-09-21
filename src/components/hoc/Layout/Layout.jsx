import React, {Component} from 'react';
import cl from './Layout.module.css';
import MenuToggle from "../../Navigation/MenuToggle/MenuToggle";
import Drawer from "../../Navigation/Drawer/Drawer";
import {connect} from "react-redux";

class Layout extends Component{

    state = {
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }

    render(){

        return(
            <div className={cl.Layout}>

                <Drawer isOpen={this.state.menu}
                        onClose={this.menuCloseHandler}
                        isAuthorize={this.props.isAuthorize}/>
                <MenuToggle onToggle={this.toggleMenuHandler}
                            isOpen={this.state.menu}/>

                <main>{this.props.children}</main>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        isAuthorize: !!state.auth.token
    }
}
export default connect(mapStateToProps)(Layout);