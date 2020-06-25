import React from 'react';
import toolbarClasses from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={toolbarClasses.Toolbar}>
        <DrawerToggle clicked = {props.click}/>
        <div className = {toolbarClasses.Logo}>
            <Logo />
        </div>
        <nav className = {toolbarClasses.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;