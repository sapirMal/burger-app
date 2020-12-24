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
import * as types from '../../store/actions';

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
        // ingredients: null,
        // totalPrice: 4,
        canBuy: false,
        purchase: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        axios.get('https://react-my-burger-55128.firebaseio.com/ingredients.json')
            .then(res => () => this.props.replace_ingredients(res.data))
            .catch(err => this.setState({error: true}));
    }

    purchaseHandler = () => this.setState({purchase: true});

    cancelOrder = () => this.setState({purchase: false});

    continueOrder = () => {
        const queryParams = [];
        for (let i in this.props.ingredients) {
            /* key=value */
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        }
        queryParams.push('price=' + this.props.totalPrice);
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
        const updateIngredients = {...this.props.ingredients};
        updateIngredients[type] += 1;
        const updatePrice = this.props.totalPrice + INGREDIENTS_PRICE[type];
        this.setState(
            {
                ingredients: updateIngredients,
                totalPrice: updatePrice
            });
        this.updateOrderButton(updateIngredients);

    }

    removeIngredientHandler = (type) => {
        const updateIngredients = {...this.props.ingredients};
        if (updateIngredients[type] > 0) {
            updateIngredients[type] -= 1;
            const updatePrice = this.props.totalPrice - INGREDIENTS_PRICE[type];
            this.setState(
                {
                    ingredients: updateIngredients,
                    totalPrice: updatePrice
                });
        }
        this.updateOrderButton(updateIngredients);
    }


    render() {
        const disabledInfo = {...this.props.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }
        let orderSummery = <Spinner />;


        if (!this.state.loading && this.props.ingredients) {
            orderSummery = <OrderSummery
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                closeModal={this.cancelOrder}
                continue={this.continueOrder} />;
        }
        let burger = (this.state.error ? <p> Ingredients can't be loaded </p> : <Spinner />);

        if (this.props.ingredients) {
            burger =
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        addition={this.props.add_ingredient}
                        reduction={this.props.remove_ingredient}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
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
        ingredients: state.ingredients, 
        totalPrice: state.totalPrice
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        add_ingredient: (ing) => dispatch({type: types.ADD_INGREDIENT, ingredient: ing}),
        remove_ingredient: (ing) => dispatch({type: types.REMOVE_INGREDIENT, ingredient: ing}),
        replace_ingredients: (ing) => dispatch({type: types.REPLACE, ingredient: ing})
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));