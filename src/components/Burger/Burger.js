import React from 'react';
import burgerClasses from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_,i) => {
            return <BurgerIngredient key = {igkey + i} type = {igkey}/>;
        });
    }).reduce((acc, curr) => {
        return acc.concat(curr);
    }, []);

    if (!transformedIngredients.length) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return(
        <div className = {burgerClasses.Burger}>
            <BurgerIngredient type = "bread-top" />
            {transformedIngredients}
            <BurgerIngredient type = "bread-bottom" />
        </div>
    );
};

export default burger;