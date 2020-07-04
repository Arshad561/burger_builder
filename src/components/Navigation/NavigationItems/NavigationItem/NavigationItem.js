import React from 'react';
import {NavLink } from 'react-router-dom';

import navigationItemClasses from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className = {navigationItemClasses.NavigationItem}>
        <NavLink to={props.link} exact = {props.exact}
        activeClassName = {navigationItemClasses.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;