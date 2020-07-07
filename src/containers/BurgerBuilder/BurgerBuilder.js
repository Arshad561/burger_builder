import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { addIngredient, removeIngredient, initIngredients, purchaseInit} from '../../store/actions/index';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }

    state = {
        orderNowClicked: false
    };

    componentDidMount() {
       this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        return Object.values(ingredients).some(value => value > 0);
    }

    orderNowHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                orderNowClicked: true
            })
        } else {
            this.props.history.push('/auth');
        }
        
    }

    orderCancelHandler = () => {
        this.setState({
            orderNowClicked: false
        })
    }

    orderContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>No Ingredients at the moment</p> : <Spinner/>
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls ingredientsAdded={this.props.onAddIngredient}
                        ingredientsRemoved={this.props.onRemoveIngredinet}
                        disabled={disabledInfo} price={this.props.totalPrice} isAuth = {this.props.isAuthenticated}
                        purchasable={this.updatePurchaseState(this.props.ingredients)} 
                        orderNowClicked={this.orderNowHandler} />
                </Aux>
            );

            orderSummary = <OrderSummary ingredients={this.props.ingredients} price={this.props.totalPrice}
            cancel={this.orderCancelHandler} continue={this.orderContinueHandler} />
        }

        return (
            <Aux>
                <Modal show={this.state.orderNowClicked} orderCancelClicked={this.orderCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientType) => dispatch(addIngredient(ingredientType)),
        onRemoveIngredinet: (ingredientType) => dispatch(removeIngredient(ingredientType)),
        onInitIngredients: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));