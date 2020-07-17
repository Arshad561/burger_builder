import { takeEvery, all } from 'redux-saga/effects';

import * as Actions from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAuth() {
    yield all([
        takeEvery(Actions.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(Actions.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(Actions.AUTH_START_SAGA, authSaga),
        takeEvery(Actions.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(Actions.SET_INGREDIENTS_SAGA, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeEvery(Actions.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(Actions.FETCH_ORDERS, fetchOrdersSaga);
}
