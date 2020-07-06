import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import contactDataClasses from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validations: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest',
                        displayValue: 'Fastest'
                    }, {
                        value: 'cheapest',
                        displayValue: 'Cheapest'
                    }]
                },
                value: 'fastest',
                validations: {

                }
            }
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        Object.keys(this.state.orderForm).forEach(key => {
            formData[key] = this.state.orderForm[key].value;
        });
        const order = {
            ingredients: this.props.ingredients,
            price: +this.props.totalPrice,
            orderData: formData
        }
        this.props.onOrderBurger(order);
    };

    inputChangedHandler = (event, label) => {
        let updatedOrderForm = {
            ...this.state.orderForm
        };
        let updatedFormElement = {
            ...updatedOrderForm[label]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidations(updatedFormElement.value, updatedFormElement.validations);
        updatedFormElement.touched = true;
        updatedOrderForm[label] = updatedFormElement;
        let formIsValid = Object.keys(updatedOrderForm).some(key => {
            return updatedOrderForm[key].valid === false
        });
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: !formIsValid
        });
    };

    checkValidations = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.minLength && isValid;
        }
        return isValid;
    }

    render() {
        const formElementsArray = Object.keys(this.state.orderForm).map(formElement => {
            return {
                label: formElement,
                ...this.state.orderForm[formElement]
            }
        });

        const elements = formElementsArray.map(formElement => {
            return <Input key={formElement.label} elementType={formElement.elementType}
                elementConfig={formElement.elementConfig} label={formElement.label}
                value={formElement.value} inValid = {!formElement.valid}
                shouldValidate = {formElement.validations} touched = {formElement.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.label)} />
        });

        let form = (
            <form onSubmit={this.orderHandler}>
                {elements}
                <Button disabled = {!this.state.formIsValid} btnType='Success'>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={contactDataClasses.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));