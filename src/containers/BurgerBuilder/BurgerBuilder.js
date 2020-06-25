import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        orderNowClicked: false
    };

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
        alert('You continue!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show = {this.state.orderNowClicked} orderCancelClicked = {this.orderCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} price = {this.state.totalPrice}
                    cancel = {this.orderCancelHandler} continue = {this.orderContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} price={this.state.totalPrice}
                    purchasable={this.state.purchasable} orderNowClicked={this.orderNowHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;