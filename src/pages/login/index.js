import { emailAndPasswordLogin, googleLogin } from '../../services/index.js';
import { onNavigate } from '../../utils/history.js';

export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.className = 'container-login';

  rootElement.innerHTML = `
    <div class="bookshelf-logo">
      <img class="logo-login logo-book" alt="Logo Bookshelf" src='../../img/logo-book.gif' />
      <img class="logo-login logo-text" alt="Logo Bookshelf" src='../../img/logo-written-dark.png' />
    </div>
    <div class="form-bg">
      <form class="form-login">
        <label class="label-begin">E-mail <span class="required">*</span></label>
        <input type="email" class="input-begin" id="email-login" name="email-login" required>
        <label class="label-begin">Senha <span class="required">*</span></label>
        <input type="password" class="input-begin" id="password-login" minlength="8" name="password-login" required>
        <button type="submit" class="btn-base btn-begin" id="btn-login">Entrar</button>
        <button id="btn-google" class="btn-google btn-base">
          <img class="btn-google-icon" src="../../img/google-icon.svg" alt="Ícone do Google"/>
          <span class="btn-google-text">Entrar com conta Google</span>
        </button>
      </form>
      <p class="question-begin">
      Ainda não tem uma conta?
      <br>
      <a href="#" id="sign-up-login" class="link-begin">Cadastre-se!</a>
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
