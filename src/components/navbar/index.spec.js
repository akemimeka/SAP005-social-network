import { Navbar } from './index.js';
import * as utils from '../../utils/history.js';

utils.onNavigate = jest.fn();

describe('Navbar', () => {
  it('should be a function', () => {
    expect(typeof Navbar).toBe('function');
  });
  it('should have a button with click event to redirect user to feed page', () => {
    Navbar().querySelector('#icon-nav-feed').dispatchEvent(new Event('click'));
    expect(utils.onNavigate).toBeCalledWith('/feed');
  });
  it('should have a button with click event to redirect user to review page', () => {
    Navbar().querySelector('#icon-nav-review').dispatchEvent(new Event('click'));
    expect(utils.onNavigate).toBeCalledWith('/review');
  });
  it('should have a button with click event to redirect user to profile page', () => {
    Navbar().querySelector('#icon-nav-profile').dispatchEvent(new Event('click'));
    expect(utils.onNavigate).toBeCalledWith('/profile');
  });
});
