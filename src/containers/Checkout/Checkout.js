import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let checkoutSummary = this.props.ingredients ?
            <CheckoutSummary ingredients={this.props.ingredients}
                onCheckoutCancel={this.checkoutCancelHandler}
                onCheckoutContinue={this.checkoutContinueHandler} /> : null;
        return (
            <div>
                {checkoutSummary}
                <Route path={this.props.match.url + '/contact-data'} component = {ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout);