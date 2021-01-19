import {
  googleLogin,
  signOut,
  emailAndPasswordLogin,
  createAccount,
  createReview,
  getReviews,
  saveEditedReview,
  deleteReview,
  likeReview,
} from './index.js';

beforeEach(() => jest.clearAllMocks());

describe('googleLogin', () => {
  it('should be a function', () => {
    expect(typeof googleLogin).toBe('function');
  });
  it('should call Firebase signInWithPopup function', () => {
    googleLogin('provider');
    expect(firebase.auth).toHaveBeenCalledTimes(1);
  });
});

describe('signOut', () => {
  it('should be a function', () => {
    expect(typeof signOut).toBe('function');
  });
  it('should call Firebase signOut function', () => {
    signOut();
    expect(firebase.auth).toHaveBeenCalledTimes(1);
  });
});

describe('emailAndPasswordLogin', () => {
  const emailValue = 'teste@teste23.com';
  const passwordValue = '12345678';
  it('should be a function', () => {
    expect(typeof emailAndPasswordLogin).toBe('function');
  });
  it('should call Firebase emailAndPasswordLogin function', () => {
    emailAndPasswordLogin(emailValue, passwordValue);
    expect(firebase.auth).toHaveBeenCalledTimes(1);
  });
});

describe('createAccount', () => {
  it('should be a function', () => {
    expect(typeof createAccount).toBe('function');
  });
  it('should call Firebase createAccount function', () => {
    createAccount();
    expect(firebase.auth).toHaveBeenCalledTimes(1);
  });
});

describe('createReview', () => {
  it('should be a function', () => {
    expect(typeof createReview).toBe('function');
  });
  it('should call Firebase createReview function', () => {
    createReview();
    expect(firebase.auth).toHaveBeenCalledTimes(1);
  });
});

describe('getReviews', () => {
  it('should be a function', () => {
    expect(typeof getReviews).toBe('function');
  });
});

describe('saveEditedReview', () => {
  it('should be a function', () => {
    expect(typeof saveEditedReview).toBe('function');
  });
});

describe('deleteReview', () => {
  it('should be a function', () => {
    expect(typeof deleteReview).toBe('function');
  });
});

describe('likeReview', () => {
  it('should be a function', () => {
    expect(typeof likeReview).toBe('function');
  });
});
