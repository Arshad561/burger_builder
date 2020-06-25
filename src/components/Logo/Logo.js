import React from 'react';
import burgerLogo from '../../assets/images/logo.png';
import logoClasses from './Logo.module.css';

const logo = (props) => (
    <div className = {logoClasses.Logo}>
        <img src = {burgerLogo} alt = "MyBurger"/>
    </div>
);

export default logo;