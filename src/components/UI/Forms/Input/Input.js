import React from 'react';

import inputClasses from './Input.module.css';

const input = (props) => {
    let element = null;
    let classes = [inputClasses.Element];
    let validationError = null;

    if (props.inValid && props.shouldValidate && props.touched) {
        classes.push(inputClasses.InValid);
        validationError = <p className = {inputClasses.ValidationError}>Please enter a valid {props.label}</p>
    }

    switch (props.elementType) {
        case ('input'): classes.join(' ')
            element = <input className={classes.join(' ')}
                {...props.elementConfig} value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            element = <textarea className={classes.join(' ')}
                {...props.elementConfig} value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            element = <select className={classes.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.displayValue} value={option.value}>{option.displayValue}</option>
                ))}
            </select>
            break;
        default:
            element = <input className={classes.join(' ')}
                {...props} value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={inputClasses.Input}>
            <label>{props.label}</label>
            {element}
            {validationError}
        </div>
    );
}

export default input;