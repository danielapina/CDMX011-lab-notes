import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import  FormRegister  from '../../components/FormRegister';
import Register from '../../components/Register';

afterEach(cleanup)

test('sobre el componente FormRegister', () =>{
    const mockHandleRegister = jest.fn()
    render(<FormRegister handleRegister={mockHandleRegister}/>)
const contentEmail = screen.getByPlaceholderText('example@example.com')
const contentPassword = screen.getByPlaceholderText('Your Password')
const contentConfirmPassword = screen.getByPlaceholderText('Confirm Your Password')
const buttonRegister = screen.getByText('Sign Up')

expect(contentEmail).toBeInTheDocument()
expect(contentPassword).toBeInTheDocument()
expect(contentConfirmPassword).toBeInTheDocument()

const emailValue= 'dani@labo.com'
const passwordValue = '12345678'
const confirmPasswordValue = '12345678'

fireEvent.change(contentEmail,{target:{value:emailValue}})
fireEvent.change(contentPassword,{target:{value:passwordValue}})
fireEvent.change(contentConfirmPassword,{target:{value:confirmPasswordValue}})
fireEvent.click(buttonRegister)

expect(mockHandleRegister).toHaveBeenCalledWith(emailValue, passwordValue,confirmPasswordValue)

});

test('<FormRegister> useContext', () =>{
    const mockHandleRegister = jest.fn()
    render(<Router><AuthProvider auth={{}} createUserWithEmailAndPassword={mockHandleRegister} onAuthStateChanged={()=> console.log()}><Switch><Route component={Register} /></Switch></AuthProvider></Router>)
const contentEmail = screen.getByPlaceholderText('example@example.com')
const contentPassword = screen.getByPlaceholderText('Your Password')
const contentConfirmPassword = screen.getByPlaceholderText('Confirm Your Password')
const buttonRegister = screen.getByText('Sign Up')


expect(contentEmail).toBeInTheDocument()
expect(contentPassword).toBeInTheDocument()
expect(contentConfirmPassword).toBeInTheDocument()

const emailValue= 'dani@labo.com'
const passwordValue = '12345678'
const confirmPasswordValue = '12345678'

fireEvent.change(contentEmail,{target:{value:emailValue}})
fireEvent.change(contentPassword,{target:{value:passwordValue}})
fireEvent.change(contentConfirmPassword,{target:{value:confirmPasswordValue}})
fireEvent.click(buttonRegister)


expect(mockHandleRegister).toHaveBeenCalledWith({},emailValue, passwordValue)

})