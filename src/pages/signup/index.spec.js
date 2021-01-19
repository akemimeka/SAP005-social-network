import { SignUp } from './index.js';
import * as services from '../../services/index.js';
import * as utils from '../../utils/history.js';

services.createAccount = jest.fn(() => true);
services.googleLogin = jest.fn(() => true);
utils.onNavigate = jest.fn();

describe('SignUp', () => {
  it('should be a function', () => {
    expect(typeof SignUp).toBe('function');
  });
  it('should load the page', () => {
    expect(SignUp()).toMatchSnapshot();
  });
  it('should have a button with click event to create an account with user name, email and password', () => {
    SignUp().querySelector('#btn-sign-up').dispatchEvent(new Event('click'));
    expect(services.createAccount).toHaveBeenCalled();
    expect(services.createAccount()).toBe(true);
  });
  it('should have a button with click event to sign up with google account', () => {
    SignUp().querySelector('#btn-google').dispatchEvent(new Event('click'));
    expect(services.googleLogin).toHaveBeenCalled();
    expect(services.googleLogin()).toBe(true);
  });
  it('should have a button with click event to redirect user to sign in page', () => {
    SignUp().querySelector('#go-back-icon').dispatchEvent(new Event('click'));
    expect(utils.onNavigate).toBeCalledWith('/');
  });
  it('should have a link with click event to redirect user to sign in page', () => {
    SignUp().querySelector('#login-link').dispatchEvent(new Event('click'));
    expect(utils.onNavigate).toBeCalledWith('/');
  });
});
