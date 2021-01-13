import { Login } from './index.js';
// import { googleLogin } from '../../services/index.js';
// import { emailAndPasswordLogin } from '../../services/index.js';

describe('Login', () => {
  it('should be a function', () => {
    expect(typeof Login).toBe('function');
  });

  it('should load the page', () => {
    expect(Login()).toMatchSnapshot();
  });
});

// describe('emailAndPasswordLogin', () => {
//   it('should be a function', () => {
//     expect(typeof renderPage).toBe('function');
//   });
// });