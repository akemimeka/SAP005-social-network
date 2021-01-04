import { userLoggedIn } from '../router.js';

const auth = firebase.auth();
// const firestore = firebase.firestore();

export const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(() => {
      userLoggedIn();
    })
    .catch();
};
