import {
  googleLogin,
  signOut,
  saveInfoProfile,
  createAccount,
  createReview,
  getReviews,
  saveEditedReview,
  deleteReview,
  likeReview,
} from './index.js';

describe('googleLogin', () => {
  it('should be a function', () => {
    expect(typeof googleLogin).toBe('function');
  });
  // it('should call Firebase', () => {
  //   googleLogin();
  //   expect(firebase.auth().signInWithPopup()).toBeCalled();
  //   expect(googleLogin()).toBe(true);
  // });
});

describe('signOut', () => {
  it('should be a function', () => {
    expect(typeof signOut).toBe('function');
  });
  it('should call Firebase', () => {
    signOut();
    expect(firebase.auth).toHaveBeenCalled();
    expect(signOut()).toBe(undefined);
  });
});

describe('saveInfoProfile', () => {
  it('should be a function', () => {
    expect(typeof saveInfoProfile).toBe('function');
  });
  // it('should call Firebase', () => {
  //   saveInfoProfile();
  //   expect(firebase).toHaveBeenCalled();
  // });
});

describe('createAccount', () => {
  it('should be a function', () => {
    expect(typeof createAccount).toBe('function');
  });
  // it('should call Firebase', () => {
  //   createAccount();
  //   expect(firebase.auth).toHaveBeenCalled();
  // });
  // it('should return undefined', () => {
  //   createAccount();
  //   expect(createAccount()).toBe(undefined);
  // });
});

describe('createReview', () => {
  it('should be a function', () => {
    expect(typeof createReview).toBe('function');
  });
  it('should call Firebase', () => {
    createReview();
    expect(firebase.auth).toHaveBeenCalled();
  });
  it('should return undefined', () => {
    expect(createReview()).toBe(undefined);
  });
});

describe('getReviews', () => {
  it('should be a function', () => {
    expect(typeof getReviews).toBe('function');
  });
  // it('should call Firebase', () => {
  //   getReviews();
  //   expect(firebase.firestore).toHaveBeenCalled();
  // });
  // it('should return undefined', () => {
  //   expect(getReviews()).toBe(undefined);
  // });
});

describe('saveEditedReview', () => {
  it('should be a function', () => {
    expect(typeof saveEditedReview).toBe('function');
  });
  // it('should call Firebase', () => {
  //   saveEditedReview();
  //   expect(firebase.firestore).toHaveBeenCalled();
  // });
  // it('should return undefined', () => {
  //   expect(saveEditedReview()).toBe(undefined);
  // });
});

describe('deleteReview', () => {
  it('should be a function', () => {
    expect(typeof deleteReview).toBe('function');
  });
  // it('should call Firebase', () => {
  //   deleteReview();
  //   expect(firebase.firestore).toHaveBeenCalled();
  // });
  // it('should return undefined', () => {
  //   expect(deleteReview()).toBe(undefined);
  // });
});

describe('likeReview', () => {
  it('should be a function', () => {
    expect(typeof likeReview).toBe('function');
  });
  // it('should call Firebase', () => {
  //   likeReview();
  //   expect(firebase.firestore).toHaveBeenCalled();
  // });
  // it('should return undefined', () => {
  //   expect(likeReview()).toBe(undefined);
  // });
});
