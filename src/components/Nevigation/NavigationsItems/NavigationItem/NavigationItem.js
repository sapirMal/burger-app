import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                // className={props.active ? classes.active : null} - active class is default in NavLink module
                to={props.link} exact
                activeClassName={classes.active}>
                {props.children}
            </NavLink>
        </li>
    );
};

export default navigationItem;