import { redirectToLogin, redirectToFeed } from '../router.js';

const logoutButton = document.querySelector('#logout-btn');
const auth = firebase.auth();
// const firestore = firebase.firestore();

const verifyLogin = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      logoutButton.classList.remove('hidden');
      redirectToFeed();
    } else {
      logoutButton.classList.add('hidden');
      redirectToLogin();
    }
  });
};

export const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(() => {
      verifyLogin();
    })
    .catch();
};

logoutButton.addEventListener('click', () => {
  auth.signOut();
  verifyLogin();
});
