import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummery = (props) => {
    const ingredients = Object.keys(props.ingredients).map(ingred => {
        return <li key={ingred} style={{textTransform: "capitalize"}}>{ingred}: {props.ingredients[ingred]}</li>;
    })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the folloing ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p><b>Total price: {props.price.toFixed(2)}$</b></p>
            <p>Continue to Chackout?</p>
            <Button
                clicked={props.closeModal}
                btnType="Danger">
                CANCEL
            </Button>
            <Button
                clicked={props.continue}
                btnType="Success">
                CONTINUE
            </Button>
        </Aux>
    )
};

export default orderSummery;