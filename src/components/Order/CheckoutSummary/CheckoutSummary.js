import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import checkoutSummaryClasses from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className = {checkoutSummaryClasses.CheckoutSummary}>
            <h1>We hope it tastes well..!</h1>
            <div style = {{width: '100%', margin: 'auto'}}>
                <Burger ingredients = {props.ingredients} />
            </div>
            <Button clicked = {props.onCheckoutCancel} btnType = 'Danger'>CANCEL</Button>
            <Button clicked = {props.onCheckoutContinue} btnType = 'Success'>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;