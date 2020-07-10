import * as Actions from '../actions/actionTypes';
import updateObject from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.PURCHASE_BURGER_STARTED:
            return updateObject(state, { loading: true });
        case Actions.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return updateObject(state, {
                orders: [...state.orders, newOrder],
                loading: false,
                purchased: true
            });
        case Actions.PURCHASE_BURGER_FAILED:
            return updateObject(state, { loading: false });
        case Actions.PURCHASE_INIT:
            return updateObject(state, { purchased: false });
        case Actions.FETCH_ORDERS_STARTED:
            return updateObject(state, { loading: true });
        case Actions.FETCH_ORDERS_SUCCESS:
            return updateObject(state, { orders: action.orders, loading: false })
        case Actions.FETCH_ORDERS_FAILED:
            return updateObject(state, { loading: false });
        default:
            return state;
    }
}

export default reducer;