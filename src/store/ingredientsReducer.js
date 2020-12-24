import * as types from './actions';

const initialState = {
    ingredients: {salad: 0, cheese: 0, meat:0, bacon: 0},
    totalPrice: 2.5
};
const INGREDIENTS_PRICE = {
    salad: 0.4,
    bacon: 1,
    cheese: 0.6,
    meat: 1.5,
}

const ingredients = (state = initialState, action) => {
    const ing = action.ingredient;
    const updateIngredients = {...state.ingredients};
    let updatePrice = state.totalPrice;
    console.log(state);
    switch (action.type) {
        case types.ADD_INGREDIENT:
            updateIngredients[ing] += 1;
            updatePrice += INGREDIENTS_PRICE[ing];
            return {ingredients: updateIngredients, totalPrice: updatePrice};
        case types.REMOVE_INGREDIENT:
            updateIngredients[ing] -= 1;
            updatePrice -= INGREDIENTS_PRICE[ing];
            return {ingredients: updateIngredients, totalPrice: updatePrice};
        case types.REPLACE:
            return {totalPrice: state.totalPrice, ingredients: ing};
        default:
            return state;
    }
}

export default ingredients;