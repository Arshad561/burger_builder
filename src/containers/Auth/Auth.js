import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Forms/Input/Input';
import authClasses from './Auth.module.css';
import { auth } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validations: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validations: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    inputChangedHandler = (event, label) => {
        let updatedControls = {
            ...this.state.controls
        };
        let updatedFormElement = {
            ...updatedControls[label]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidations(updatedFormElement.value, updatedFormElement.validations);
        updatedFormElement.touched = true;
        updatedControls[label] = updatedFormElement;
        // let formIsValid = Object.keys(updatedControls).some(key => {
        //     return updatedControls[key].valid === false
        // });
        this.setState({
            controls: updatedControls
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

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }
    
    render() {

        const formElementsArray = Object.keys(this.state.controls).map(formElement => {
            return {
                label: formElement,
                ...this.state.controls[formElement]
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
            <form onSubmit={this.submitHandler}>
                {elements}
                <Button btnType='Success'>SUBMIT</Button>
            </form>
        );
        
        if (this.props.loading) {
            form = <Spinner/>
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
            <p style = {{color: 'red'}}>{this.props.error.message}</p>
            );
        }

        return (
            <div className = {authClasses.Auth}>
                {this.props.token ? <Redirect to = '/'/> : null}
                {errorMessage}
                {form}
                <Button clicked = {this.switchAuthModeHandler}
                btnType = 'Danger'>SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        error: state.auth.error,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);