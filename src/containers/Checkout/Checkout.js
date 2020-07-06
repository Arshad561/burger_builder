import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        let checkoutSummary = <Redirect to='/' />;
        if (this.props.ingredients) {
            let purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            checkoutSummary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ingredients}
                        onCheckoutCancel={this.checkoutCancelHandler}
                        onCheckoutContinue={this.checkoutContinueHandler} />
                    <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
                </div>
            )

        }
        return checkoutSummary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);