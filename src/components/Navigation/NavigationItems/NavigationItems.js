import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import navigationItemsClasses from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className = {navigationItemsClasses.NavigationItems}>
        <NavigationItem link = "/" exact>Burger Builder</NavigationItem>
        <NavigationItem link = "/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;