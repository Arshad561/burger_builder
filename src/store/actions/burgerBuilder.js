import * as Actions from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingredientType => {
    return {
        type: Actions.ADD_INGREDIENT,
        ingredientType
    };
}

export const removeIngredient = ingredientType => {
    return {
        type: Actions.REMOVE_INGREDIENT,
        ingredientType
    };
}

export const setIngredients = ingredients => {
    return {
        type: Actions.SET_INGREDIENTS,
        ingredients
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: Actions.FETCH_INGREDIENTS_FAILED
    };
}

export const initIngredients = () => {
    return dispatch => {
         axios.get('/ingredients.json').then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => {
            dispatch(fetchIngredientsFailed());
        })
    };
}