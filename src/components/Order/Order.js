import React from 'react';
import classes from './Order.css';

const order = (props) => {
    let ingredients = [];
    for (let ing in props.ingredients){
        ingredients.push({
            name: ing,
            amount: props.ingredients[ing]
        });
    }
    ingredients = ingredients.map(ing => <span key={ing.name}> {ing.name} ({ing.amount}) </span>);
    return (
        <div className={classes.Order}>
            <p>Ingredient: {ingredients} </p>
            <p>Price: <b>{props.price.toFixed(2)} $</b> </p>
        </div>
    );
}

export default order;
