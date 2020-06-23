import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import buildControlsClasses from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
    return (
        <div className={buildControlsClasses.BuildControls}>
            {controls.map(ctrl => {
                return <BuildControl key={ctrl.label} label={ctrl.label} 
                added = {() => props.ingredientsAdded(ctrl.type)}
                removed ={() => props.ingredientsRemoved(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}/>
            })}
        </div>
    );
}

export default buildControls;