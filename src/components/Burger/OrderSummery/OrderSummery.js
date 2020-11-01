import React from 'react';
import Aux from '../../../hoc/Auxiliary';

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
            <p>Continue to chack out?</p>
        </Aux>
    )
};

export default orderSummery;