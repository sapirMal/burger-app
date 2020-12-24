import * as types from './actions';

const ingredients = (state = {salad: 0, meat: 0, bacon: 0, cheese: 0}, action) => {
    switch (action.type) {
        case types.increment_salad:
            return {...state, salad: state.salad + 1};
        case types.increment_bacon:
            return {...state, bacon: state.bacon + 1};
        case types.increment_meat:
            return {...state, meat: state.meat + 1};
        case types.increment_cheese:
            return {...state, cheese: state.cheese + 1};
        case types.decrement_salad:
            return {...state, salad: state.salad - 1};
        case types.decrement_bacon:
            return {...state, bacon: state.bacon - 1};
        case types.decrement_meat:
            return {...state, meat: state.meat - 1};
        case types.decrement_cheese:
            return {...state, cheese: state.cheese - 1};
        default:
            return state;
    }
}

export default ingredients;