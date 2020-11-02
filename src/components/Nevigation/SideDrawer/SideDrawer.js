import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationsItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';


const sideDrawer = (props) => {
    let styleClasses = [classes.SideDrawer, classes.Close];

    if (props.show) {
        styleClasses[1] = classes.Open;
    }

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.close} />
            <div className={styleClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>

            </div>
        </Aux>
    );
};

export default sideDrawer;