import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentWillMount() {
        axios.get('/orders.json').then(response => {
            let fetchOrders = [];
            Object.keys(response.data).forEach(key => {
                fetchOrders.push({
                    ...response.data[key],
                    id: key
                });
            })
            this.setState({
                orders: fetchOrders,
                loading: false
            });       
        }).catch(error => {
            this.setState({
                loading: false
            })
        });
    }
    render() {
        let orders = this.state.orders.map(order => {
            return <Order key = {order.id} ingredients = {order.ingredients}
            price = {order.price} id = {order.id}/>
        })
        if (this.state.loading) {
            orders = <Spinner/>
        }
        return(
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);