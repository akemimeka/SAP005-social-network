import { Navbar } from './index.js';

describe('Navbar', () => {
  it('should be a function', () => {
    expect(typeof Navbar).toBe('function');
  });
  it('should ', () => {
    expect(navbar).toBeCalledWith('/');
  });
});
