import * as Actions from '../actions/actionTypes';
import updateObject from '../utility';

const INGEREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientType]: state.ingredients[action.ingredientType] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGEREDIENTS_PRICE[action.ingredientType],
        building: true
    })
    return updatedState;
}

const removeIngredient = (state, action) => {
    const updatedIngredient1 = { [action.ingredientType]: state.ingredients[action.ingredientType] - 1 };
    const updatedIngredients1 = updateObject(state.ingredients, updatedIngredient1);
    const updatedState1 = updateObject(state, {
        ingredients: updatedIngredients1,
        totalPrice: state.totalPrice - INGEREDIENTS_PRICE[action.ingredientType],
        building: true
    })
    return updatedState1;
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.ADD_INGREDIENT: return addIngredient(state, action);
        case Actions.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case Actions.SET_INGREDIENTS: return setIngredients(state, action);
        case Actions.FETCH_INGREDIENTS_FAILED: return updateObject(state, { error: true });
        default: return state;
    }
}

export default reducer;