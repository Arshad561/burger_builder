import React from 'react';
import drawerToggleClasses from './DrawerToggle.module.css';

const drawerToggle = (props) => {
    return (
        <div className = {drawerToggleClasses.DrawerToggle} onClick = {props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default drawerToggle;