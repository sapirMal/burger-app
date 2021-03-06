import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    {label: 'Meat', type: 'meat'},
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    ];

const buildControls = props => {
    return <div className={classes.BuildControls}>
        <p>Current Price: <b>{props.price.toFixed(2)}$</b></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                addition={() => props.addition(ctrl.type)}
                reduction={() => props.reduction(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button 
        className={classes.OrderButton} 
        onClick={props.purchase}
        disabled={!props.canBuy}>ORDER NOW</button>
    </div>
};

export default buildControls;