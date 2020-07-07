import * as Actions from './actionTypes';
import axios from '../../axios-orders';

export const puchaseBurgerSuccess = (id, orderData) => {
    return {
        type: Actions.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    };
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: Actions.PURCHASE_BURGER_FAILED,
        error
    };
}

export const purchaseBurgerStarted = () => {
    return {
        type: Actions.PURCHASE_BURGER_STARTED,

    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStarted());
        axios.post('/orders.json?auth=' + token, orderData).then(response => {
            dispatch(puchaseBurgerSuccess(response.data.name, orderData))
        }).catch(error => {
            dispatch(purchaseBurgerFailed(error));
        });
    }
}

export const purchaseInit = () => {
    return {
        type: Actions.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: Actions.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: Actions.FETCH_ORDERS_FAILED,
        error
    }
}

export const fetchOrdersStarted = () => {
    return {
        type: Actions.FETCH_ORDERS_STARTED
    }
}

export const fetchOrders = token => {
    return dispatch => {
        dispatch(fetchOrdersStarted());
        axios.get('/orders.json?auth=' + token).then(response => {
            let fetchOrders = [];
            Object.keys(response.data).forEach(key => {
                fetchOrders.push({
                    ...response.data[key],
                    id: key
                });
            })
            dispatch(fetchOrdersSuccess(fetchOrders));   
        }).catch(error => {
            dispatch(fetchOrdersFailed(error));
        });
    }
}
