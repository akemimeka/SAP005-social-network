import { Login } from './index.js';
import * as services from '../../services/index.js';
import * as utils from '../../utils/history.js';

services.emailAndPasswordLogin = jest.fn(() => true);
services.googleLogin = jest.fn(() => true);
utils.onNavigate = jest.fn();

describe('Login', () => {
  it('should be a function', () => {
    expect(typeof Login).toBe('function');
  });
  it('should load the page', () => {
    expect(Login()).toMatchSnapshot();
  });
  it('should have a button with click event to sign in with email and password', () => {
    Login().querySelector('#btn-login').dispatchEvent(new Event('click'));
    expect(services.emailAndPasswordLogin).toHaveBeenCalled();
    expect(services.emailAndPasswordLogin()).toBe(true);
  });
  it('should have a button with click event to sign in with google account', () => {
    Login().querySelector('#btn-google').dispatchEvent(new Event('click'));
    expect(services.googleLogin).toHaveBeenCalled();
    expect(services.googleLogin()).toBe(true);
  });
  it('should have a button with click event to redirect user to sign up page', () => {
    Login().querySelector('#sign-up-login').dispatchEvent(new Event('click'));
    expect(utils.onNavigate).toBeCalledWith('/signup');
  });
});
