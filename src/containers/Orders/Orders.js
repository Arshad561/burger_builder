import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchOrders } from '../../store/actions/index';

class Orders extends Component {
    
    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }
    render() {
        let orders = this.props.orders.map(order => {
            return <Order key = {order.id} ingredients = {order.ingredients}
            price = {order.price} id = {order.id}/>
        })
        if (this.props.loading) {
            orders = <Spinner/>
        }
        return(
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));