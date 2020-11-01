import React from 'react';
import classes from './BuildControl.css';


const buildConrol = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button
            className={classes.Less}
            onClick={props.reducion}
            disabled={props.disabled}>Less</button>
        <button
            className={classes.More}
            onClick={props.addition}>More</button>
    </div>
);

export default buildConrol;