import { createAccount, googleLogin } from '../../services/index.js';
import { onNavigate } from '../../utils/history.js';

export const SignUp = () => {
  const rootElement = document.createElement('div');
  rootElement.className = 'container-signup';

  const templateSignUp = `
    <header class="header-sign-up">
      <i class="icon-arrow fas fa-chevron-left" id="go-back-icon"></i>
      <p class="title-sign-up">Vamos começar?</p>
    </header>
    <form class="form-sign-up">
      <label class="label-begin" for="username">Nome<span class="required"> *</span></label>
      <input class="input-begin" id="user-name" type="text" name="username" required>
      <label class="label-begin" for="email">E-mail<span class="required"> *</span></label>
      <input class="input-begin" type="email" name="email" id="sign-up-email" required> 
      <label class="label-begin" for"password">Senha<span class="required"> *</span></label>
      <input class="input-begin" type="password" name="password" minlength="8" id="sign-up-password" placeholder="Mínimo de 8 caracteres" required>
      <label class="label-begin" for="confirm-password">Confirmar senha<span class="required"> *</span></label>
      <input class="input-begin" type="password" name="confirm-password" minlength="8" id="confirm-password" placeholder="Mínimo de 8 caracteres" required>
      <button class="btn-base btn-begin" type="submit" id="btn-sign-up">Cadastrar</button>
      <button id="btn-google" class="btn-base btn-google">
        <img class="btn-google-icon" src="../../img/google-icon.svg" alt="Ícone do Google"/>
        <span class="btn-google-text">Cadastrar com conta Google</span>
      </button>
    </form>
    <p class="question-begin">Já tem uma conta?<br>
    <a href="#" id="login-link" class="link-begin">Entrar</a>
    </p>
  `;

  rootElement.innerHTML = templateSignUp;

  const userName = rootElement.querySelector('#user-name');
  const email = rootElement.querySelector('#sign-up-email');
  const password = rootElement.querySelector('#sign-up-password');
  const confirmPassword = rootElement.querySelector('#confirm-password');
  const signUpButton = rootElement.querySelector('#btn-sign-up');

  signUpButton.addEventListener('click', (event) => {
    event.preventDefault();
    const userNameValue = userName.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;
    createAccount(userNameValue, emailValue, passwordValue, confirmPasswordValue);
  });

  const googleButton = rootElement.querySelector('#btn-google');
  googleButton.addEventListener('click', (event) => {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    googleLogin(provider);
  });

  const goBack = rootElement.querySelector('#go-back-icon');
  goBack.addEventListener('click', (event) => {
    event.preventDefault();
    onNavigate('/');
  });

  const linkLogin = rootElement.querySelector('#login-link');
  linkLogin.addEventListener('click', (event) => {
    event.preventDefault();
    onNavigate('/');
  });

  return rootElement;
};
