import React from 'react';
import buttonClasses from './Button.module.css';

const button = (props) => (
    <button onClick = {props.clicked} disabled = {props.disabled}
    className = {[buttonClasses.Button, buttonClasses[props.btnType]].join(' ')}>
        {props.children}
    </button>
);

export default button;