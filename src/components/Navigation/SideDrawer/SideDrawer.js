import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import sideDrawerClasses from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';

const sideDrawer = (props) => {
    let attachedClasses = [sideDrawerClasses.SideDrawer, sideDrawerClasses.Close];
    if (props.open) {
        attachedClasses = [sideDrawerClasses.SideDrawer, sideDrawerClasses.Open];
    }
    return (
        <Aux>
            <Backdrop show = {props.open} clicked = {props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={sideDrawerClasses.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;