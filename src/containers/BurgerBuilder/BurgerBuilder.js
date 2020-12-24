import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as types from '../../Redux/actions';

const INGREDIENTS_PRICE = {
    salad: 0.4,
    bacon: 1,
    cheese: 0.6,
    meat: 1.5,
}

class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }


    state = {
        ingredients: null,
        totalPrice: 4,
        canBuy: false,
        purchase: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        axios.get('https://react-my-burger-55128.firebaseio.com/ingredients.json')
            .then(res => this.setState({ingredients: res.data}))
            .catch(err => this.setState({error: true}));
    }

    purchaseHandler = () => this.setState({purchase: true});

    cancelOrder = () => this.setState({purchase: false});

    continueOrder = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            /* key=value */
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&'),
        });
    };

    updateOrderButton = (ingredients) => {
        const sum = Object.keys(ingredients).map(el => ingredients[el]).reduce((sum, el) => sum += el, 0);
        this.setState({canBuy: sum > 0});
    }

    addIngredientHandler = (type) => {
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] += 1;
        const updatePrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
        this.setState(
            {
                ingredients: updateIngredients,
                totalPrice: updatePrice
            });
        this.updateOrderButton(updateIngredients);

    }

    removeIngredientHandler = (type) => {
        const updateIngredients = {...this.state.ingredients};
        if (updateIngredients[type] > 0) {
            updateIngredients[type] -= 1;
            const updatePrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
            this.setState(
                {
                    ingredients: updateIngredients,
                    totalPrice: updatePrice
                });
        }
        this.updateOrderButton(updateIngredients);
    }


    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }
        let orderSummery = <Spinner />;


        if (!this.state.loading && this.state.ingredients) {
            orderSummery = <OrderSummery
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                closeModal={this.cancelOrder}
                continue={this.continueOrder} />;
        }
        let burger = (this.state.error ? <p> Ingredients can't be loaded </p> : <Spinner />);

        if (this.state.ingredients) {
            burger =
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addition={this.addIngredientHandler}
                        reduction={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        canBuy={this.state.canBuy}
                        purchase={this.purchaseHandler}
                    />
                </Aux>
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchase}
                    closeModal={this.cancelOrder}>
                    {orderSummery}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment_bacon: () => dispatch({type: types.increment_bacon}),
        decrement_bacon: () => dispatch({type: types.decrement_bacon}),
        increment_meat: () => dispatch({type: types.increment_meat}),
        decrement_meat: () => dispatch({type: types.decrement_meat}),
        increment_salad: () => dispatch({type: types.increment_salad}),
        decrement_salad: () => dispatch({type: types.decrement_salad}),
        increment_cheese: () => dispatch({type: types.increment_cheese}),
        decrement_cheese: () => dispatch({type: types.decrement_cheese}),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));