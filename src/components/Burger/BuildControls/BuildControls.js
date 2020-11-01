import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},

];

const buildControls = props => {
    return <div className={classes.BuildControls}>
        <p>Current Price: <b>{props.price.toFixed(2)}$</b></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                addition={() => props.addition(ctrl.type)}
                reducion={() => props.reducion(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button className={classes.OrderButton} disabled={!props.canBuy}>ORDER NOW</button>
    </div>
};

export default buildControls;