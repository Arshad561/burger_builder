import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import navigationItemsClasses from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className = {navigationItemsClasses.NavigationItems}>
        <NavigationItem link = "/" active>Burger Builder</NavigationItem>
        <NavigationItem link = "/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;