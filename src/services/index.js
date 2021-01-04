// ARQUIVO PARA FUNÇÕES CRUD (CREATE, READ, UPDATE & DELETE) RELACIONADAS AO FIREBASE

import { redirectToPage } from '../router.js';

const logoutButton = document.querySelector('#logout-btn');
const auth = firebase.auth();
// const firestore = firebase.firestore();

const verifyLogin = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      logoutButton.classList.remove('hidden');
      redirectToPage('/feed');
    } else {
      logoutButton.classList.add('hidden');
      redirectToPage('/');
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
