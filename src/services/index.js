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

export const googleLogin = (event) => {
  event.preventDefault();
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

export const emailAndPasswordLogin = (event) => {
  event.preventDefault();
  const email = document.querySelector('#email-login').value;
  const password = document.querySelector('#password-login').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('usuário', user);
      alert('usuário logado!');
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        alert('Endereço de email não é válido');
      } else if (errorCode === 'auth/user-disabled.') {
        alert ('O usuário correspondente ao e-mail fornecido foi desativado.');
      } else if (errorCode === 'auth/user-not-found') {
        alert ('Não há nenhum usuário correspondente ao e-mail fornecido.');
      } else if (errorCode === 'auth/wrong-password') {
        alert ('A senha é inválida para o e-mail fornecido ou a conta correspondente ao e-mail não tem uma senha definida.');
      } else {
        alert('Algo deu errado. Por favor, tente novamente.');
      }
    });
};

export const createRegister = (event) => {
  event.preventDefault();
  const email = document.querySelector('#register-email').value;
  const password = document.querySelector('#register-password').value;
  const confirmPassword = document.querySelector('#confirm-password').value;
  if (password !== confirmPassword) {
    alert('A senha digitada está diferente em um dos campos');
    return false;
  }
  auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('usuário', user);
      alert('usuário criado');
      verifyLogin();
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        alert('E-mail já cadastrado');
      } else if (errorCode === 'auth/invalid-email') {
        alert('E-mail inválido');
      } else if (errorCode === 'auth/weak-password') {
        alert('Senha fraca');
      }
    });
};