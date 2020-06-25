import React from 'react';
import backdropClasses from './Backdrop.module.css';

const backdrop = (props) => (
    props.show ? <div className = {backdropClasses.Backdrop} onClick = {props.clicked}></div> : null
);

export default backdrop;