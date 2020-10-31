import React from 'react';
import classes from './Burger.css'
import BurgerIngredeint from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let trandformIngredients =
        Object.keys(props.ingredients).map(ingerdientKey => {
            return [...Array(props.ingredients[ingerdientKey])].map((_, i) => {
                return <BurgerIngredeint
                    key={ingerdientKey + i}
                    type={ingerdientKey} />
            });
        }).reduce((arr, curr) => {
            return arr.concat(curr);
        },[]);

        if(trandformIngredients.length === 0){
            trandformIngredients = <p> Please start adding ingredients! </p>;
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredeint type='bread-top' />
            {trandformIngredients}
            <BurgerIngredeint type='bread-bottom' />

        </div>
    );

};

export default burger;
