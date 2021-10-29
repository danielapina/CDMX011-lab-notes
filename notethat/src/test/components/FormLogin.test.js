import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import  FormLogin  from '../../components/FormLogin';
import Login from '../../components/Login'

afterEach(cleanup)

test('sobre el componente FormLogin', () =>{
    const mockHandleLogin = jest.fn()
    render(<FormLogin handleLogin={mockHandleLogin}/>)
const contentEmail = screen.getByPlaceholderText('example@example.com')
const contentPassword = screen.getByPlaceholderText('Your Password')
const buttonLogin = screen.getByText('Log In')

expect(contentEmail).toBeInTheDocument()
expect(contentPassword).toBeInTheDocument()

const emailValue= 'dani@labo.com'
const passwordValue = '12345678'

fireEvent.change(contentEmail,{target:{value:emailValue}})
fireEvent.change(contentPassword,{target:{value:passwordValue}})
fireEvent.click(buttonLogin)

expect(mockHandleLogin).toHaveBeenCalledWith(emailValue, passwordValue)

});

test('<FormLogin> useContext', () =>{
    const mockHandleLogin = jest.fn()
    render(<Router><AuthProvider auth={{}} signInWithEmailAndPassword={mockHandleLogin} onAuthStateChanged={()=> console.log()}><Switch><Route component={Login} /></Switch></AuthProvider></Router>)
const contentEmail = screen.getByPlaceholderText('example@example.com')
const contentPassword = screen.getByPlaceholderText('Your Password')
const buttonLogin = screen.getByText('Log In')

expect(contentEmail).toBeInTheDocument()
expect(contentPassword).toBeInTheDocument()

const emailValue= 'dani@labo.com'
const passwordValue = '12345678'

fireEvent.change(contentEmail,{target:{value:emailValue}})
fireEvent.change(contentPassword,{target:{value:passwordValue}})
fireEvent.click(buttonLogin)

expect(mockHandleLogin).toHaveBeenCalledWith({},emailValue, passwordValue)

})