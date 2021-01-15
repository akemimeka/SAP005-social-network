global.firebase = {
  auth: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(),
    currentUser: {
      uid: 1,
    },
  })),
};
