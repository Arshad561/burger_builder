import React from 'react';
import navigationItemClasses from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className = {navigationItemClasses.NavigationItem}>
        <a className = {props.active ? navigationItemClasses.active : null} 
        href={props.link} >{props.children}</a>
    </li>
);

export default navigationItem;