import { createAccount, googleLogin } from '../../services/index.js';
import { redirectToPage } from '../../router.js';

export const SignUp = () => {
  const rootElement = document.createElement('div');

  const templateSignUp = `
    <header class="header-sign-up">
      <i class="icon-arrow fas fa-chevron-left"></i>
      <h1 class="title-sign-up">Vamos começar!</h1>
    </header>
    <section>
      <form class="form-sign-up">
        <label class="label-sign-up-name" for="username">Nome</label>
        <input class="input-sign-up-name" type="text" name="username" required>
        <label class="label-sign-up-email" for="email">E-mail</label>
        <input class="input-sign-up-email" type="email" name="email" id="sign-up-email" required> 
        <label class="label-sign-up-password" for"password">Senha</label>
        <input class="input-sign-up-password" type="password" name="password" minlength="8" id="sign-up-password" placeholder="A senha deve conter no mínimo 8 caracteres" required>
        <label class="label-confirm-password" for="confirm-password">Confirmar senha</label>
        <input class="input-confirm-password" type="password" name="confirm-password" minlength="8" id="confirm-password" placeholder="A senha deve conter no mínimo 8 caracteres" required>
        <button class="btn-sign-up" type="submit" id="btn-sign-up">Registrar-se</button>
        <label class="option-sign-up">Ou</label>
        <button id="btn-google">
          <img class="btn-google-icon" src="../../img/google-icon.svg" alt="Ícone do Google"/>
          <span class="btn-google-text">Cadastre-se com conta Google</span>
        </button>
      </form>
    </section>
    <p class="login-link">
    Já tem uma conta? <a href="#" id="login-link">Entrar</a>
    </p>
  `;

  rootElement.innerHTML = templateSignUp;

  const signUpButton = rootElement.querySelector('#btn-sign-up');
  signUpButton.addEventListener('click', createAccount);

  const googleButton = rootElement.querySelector('#btn-google');
  googleButton.addEventListener('click', googleLogin);

  const linkLogin = rootElement.querySelector('#login-link');
  linkLogin.addEventListener('click', (event) => {event.preventDefault(); redirectToPage('/');});

  return rootElement;
};
