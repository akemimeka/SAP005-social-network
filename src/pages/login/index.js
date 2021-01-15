import { emailAndPasswordLogin, googleLogin } from '../../services/index.js';
import { onNavigate } from '../../utils/history.js';

export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.className = 'container';

  rootElement.innerHTML = `
      <img class="bookshelf-logo" src='../../img/logo-bookshelf.gif' />
      <div class="black-bg">
        <form class="form-login">
          <label class="label-login">E-mail <span class="required">*</span></label>
          <input type="email" class="input-login" id="email-login" name="email-login" required>
          <label class="label-login">Senha <span class="required">*</span></label>
          <input type="password" class="input-login" id="password-login" minlength="8" name="password-login" required>
          <button type="submit" class="btn-login" id="btn-login">Login</button>
          <button id="btn-google" class="btn-google">
            <img class="btn-google-icon" src="../../img/google-icon.svg" alt="Ícone do Google"/>
            <span class="btn-google-text">Entrar com conta Google</span>
          </button>
        </form>
      <p class="sign-up-question">
        Ainda não tem uma conta?
        <br>
        <a href="#" id="sign-up-login" class="sign-up-link">Cadastre-se!</a>
      </p>
      </div>
  `;
  const loginButton = rootElement.querySelector('#btn-login');
  const googleButton = rootElement.querySelector('#btn-google');
  const linkSignUp = rootElement.querySelector('#sign-up-login');
  const email = rootElement.querySelector('#email-login');
  const password = rootElement.querySelector('#password-login');

  googleButton.addEventListener('click', googleLogin);

  loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    const emailValue = email.value;
    const passwordValue = password.value;
    emailAndPasswordLogin(emailValue, passwordValue);
  });

  linkSignUp.addEventListener('click', (event) => {
    event.preventDefault();
    onNavigate('/signup');
  });

  return rootElement;
};
