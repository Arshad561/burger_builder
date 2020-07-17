import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as burgerBuilderActions from '../actions/burgerBuilder';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('/ingredients.json');
        yield put(burgerBuilderActions.setIngredients(response.data));
    } catch(error) {
        yield put(burgerBuilderActions.fetchIngredientsFailed());
    }   
};
