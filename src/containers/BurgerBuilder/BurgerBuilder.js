import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';

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
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        canBuy: false,
        purchase: false
    };

    purchaseHandler = () => this.setState({purchase: true});

    cancelOrder = () => this.setState({purchase: false});
    
    continueOrder = () => alert('You continue!!');

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

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <Modal
                    show={this.state.purchase}
                    closeModal={this.cancelOrder}>
                    <OrderSummery
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        closeModal={this.cancelOrder}
                        continue={this.continueOrder} />
                </Modal>
                <BuildControls
                    addition={this.addIngredientHandler}
                    reducion={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    canBuy={this.state.canBuy}
                    purchase={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;