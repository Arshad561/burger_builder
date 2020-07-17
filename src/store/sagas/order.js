import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as orderActions from '../actions';

export function* purchaseBurgerSaga(action) {
    yield put(orderActions.purchaseBurgerStarted());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(orderActions.puchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(orderActions.purchaseBurgerFailed(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(orderActions.fetchOrdersStarted());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/orders.json' + queryParams);
        let fetchOrders = [];
        Object.keys(response.data).forEach(key => {
            fetchOrders.push({
                ...response.data[key],
                id: key
            });
        })
        yield put(orderActions.fetchOrdersSuccess(fetchOrders));
    } catch (error) {
        yield put(orderActions.fetchOrdersFailed(error));
    }
}