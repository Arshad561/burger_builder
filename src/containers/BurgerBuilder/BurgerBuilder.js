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
import * as Actions from '../../store/actions';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }

    state = {
        orderNowClicked: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios.get('/ingredients.json').then(response => {
        //     this.setState({
        //         ingredients: response.data
        //     })
        //     console.log(response);
        // }).catch(error => {
        //     this.setState({
        //         error: true
        //     })
        // })
    }

    updatePurchaseState = (ingredients) => {
        return Object.values(ingredients).some(value => value > 0);
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

        let burger = this.state.error ? <p>No Ingredients at the moment</p> : <Spinner/>
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls ingredientsAdded={this.props.onAddIngredient}
                        ingredientsRemoved={this.props.onRemoveIngredinet}
                        disabled={disabledInfo} price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)} orderNowClicked={this.orderNowHandler} />
                </Aux>
            );

            orderSummary = <OrderSummary ingredients={this.props.ingredients} price={this.props.totalPrice}
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientType) => dispatch({
            type: Actions.ADD_INGREDIENT,
            ingredientType
        }),
        onRemoveIngredinet: (ingredientType) => dispatch({
            type: Actions.REMOVE_INGREDIENT,
            ingredientType
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));