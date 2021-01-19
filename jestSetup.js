global.firebase = {
  auth: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve()),
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
    signInWithPopup: jest.fn(() => Promise.resolve()),
    signOut: jest.fn(),
    currentUser: {
      uid: 1,
    },
  })),
  firestore: jest.fn(() => ({
    collection: jest.fn(),
    doc: jest.fn(() => ({
      onSnapshot: () => ({
        data: () => ({
          likes: 1,
        }),
      }),
    })),
  })),
};
