import * as Actions from './actionTypes';

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
    return {
        type: Actions.PURCHASE_BURGER,
        orderData,
        token
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

export const fetchOrders = (token, userId) => {
    return {
        type: Actions.FETCH_ORDERS,
        token,
        userId
    }
}
