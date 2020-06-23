import React from 'react';
import buildControlClasses from './BuildControl.module.css';

const buildControl = (props) => {
    return (
        <div className={buildControlClasses.BuildControl}>
            <div className={buildControlClasses.Label}>{props.label}</div>
            <button className={buildControlClasses.Less} onClick = {props.removed} disabled = {props.disabled}>Less</button>
            <button className={buildControlClasses.More} onClick = {props.added}>More</button>
        </div>
    );
};

export default buildControl;