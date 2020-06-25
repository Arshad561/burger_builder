import React, { Component } from 'react';
import Aux from '../Auxilary/Auxilary';
import layoutClasses from './Layout.module.css';
import Toolabar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    SideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }

    render() {
        return (
            <Aux>
                <Toolabar click = {this.SideDrawerToggleHandler}/>
                <SideDrawer open = {this.state.showSideDrawer} closed = {this.SideDrawerClosedHandler}/>
                <main className={layoutClasses.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;