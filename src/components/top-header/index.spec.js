import { topHeaderNav } from './index.js';
import * as services from '../../services/index.js';
import * as utils from '../../utils/history.js';

utils.onNavigate = jest.fn();
services.signOut = jest.fn(() => true);

describe('topHeaderNav', () => {
  it('should be a function', () => {
    expect(typeof topHeaderNav).toBe('function');
  });
  it('should have a button with click event to sing out', () => {
    topHeaderNav().querySelector('#icon-sign-out').dispatchEvent(new Event('click'));
    expect(services.signOut).toHaveBeenCalled();
    expect(services.signOut()).toBe(true);
  });
  it('should have a button with click event to redirect user to feed page', () => {
    topHeaderNav().querySelector('#icon-sign-out').dispatchEvent(new Event('click'));
    expect(utils.onNavigate).toBeCalledWith('/');
  });
});
