import React from 'react';

import orderClasses from './Order.module.css';

const Order = (props) => {
    let ingredients = [];
    Object.keys(props.ingredients).forEach(ingredient => {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        });
    });
    const ingredientOutput = ingredients.map(ingredient => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}
            key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>
    });
    return (
        <div className={orderClasses.Order}>
            <p>OrderId: <strong>{props.id}</strong></p>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>${props.price}</strong></p>
        </div>
    );
};

export default Order;