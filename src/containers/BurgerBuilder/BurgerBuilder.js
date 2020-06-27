import React, { Component } from 'react';

import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGEREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        orderNowClicked: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('/ingredients.json').then(response => {
            this.setState({
                ingredients: response.data
            })
        }).catch(error => {
            this.setState({
                error: true
            })
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGEREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceSubstraction = INGEREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubstraction;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients);
    };

    updatePurchaseState = (ingredients) => {
        let ingredientsExist = Object.values(ingredients).some(value => value > 0);
        this.setState({
            purchasable: ingredientsExist
        });
    }

    orderNowHandler = () => {
        this.setState({
            orderNowClicked: true
        })
    }

    orderCancelHandler = () => {
        this.setState({
            orderNowClicked: false
        })
    }

    orderContinueHandler = () => {
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Arshad',
                address: {
                    street: 'Test',
                    zipCode: 123456,
                    country: 'india'
                },
                email: 'arshad@test.com',
                deliveryMethod: 'fastest'
            }
        }
        axios.post('/orders.json', order).then(response => {
            this.setState({
                loading: false,
                orderNowClicked: false
            });
        }).catch(error => {
            this.setState({
                loading: false,
                orderNowClicked: false
            });
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>No Ingredients at the moment</p> : <Spinner/>
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls ingredientsAdded={this.addIngredientHandler}
                        ingredientsRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo} price={this.state.totalPrice}
                        purchasable={this.state.purchasable} orderNowClicked={this.orderNowHandler} />
                </Aux>
            );

            orderSummary = <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice}
            cancel={this.orderCancelHandler} continue={this.orderContinueHandler} />
            if (this.state.loading) {
                orderSummary = <Spinner />
            }
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

export default withErrorHandler(BurgerBuilder, axios);