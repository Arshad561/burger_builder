import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import navigationItemsClasses from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className = {navigationItemsClasses.NavigationItems}>
        <NavigationItem link = "/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticated? 
        <NavigationItem link = "/orders">Orders</NavigationItem> :
        null}
        {props.isAuthenticated ? 
        <NavigationItem link = '/logout'>Logout</NavigationItem> :
        <NavigationItem link = '/auth'>Authentication</NavigationItem>
        }
    </ul>
);

export default navigationItems;