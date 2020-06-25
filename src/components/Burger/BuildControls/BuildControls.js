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
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                return <BuildControl key={ctrl.label} label={ctrl.label} 
                added = {() => props.ingredientsAdded(ctrl.type)}
                removed ={() => props.ingredientsRemoved(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}/>
            })}
            <button className = {buildControlsClasses.OrderButton} 
            disabled = {!props.purchasable} onClick = {props.orderNowClicked}>ORDER NOW</button>
        </div>
    );
}

export default buildControls;