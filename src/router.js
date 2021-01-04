import { onNavigate } from './utils/history.js';
import { Feed } from './pages/feed/index.js';
import { Register } from './pages/register/index.js';
import { Login } from './pages/login/index.js';
import { Review } from './pages/review/index.js';
import { Profile } from './pages/profile/index.js';

const root = document.querySelector('#root');
const auth = firebase.auth();

const routes = {
  '/': Login,
  '/feed': Feed,
  '/register': Register,
  '/review': Review,
  '/profile': Profile,
};

const renderRoute = () => {
  root.innerHTML = '';
  root.appendChild(routes[window.location.pathname]());
};

export const userLoggedIn = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const logoutButton = document.querySelector('#logout-btn');
      logoutButton.classList.remove('hidden');

      onNavigate('/feed');
      renderRoute();
    } else {
      onNavigate('/');
      renderRoute();
    }
  });
};

document.querySelector('#logout-btn').addEventListener('click', () => {
  onNavigate('/');
  renderRoute();
});

window.addEventListener('popstate', () => renderRoute());
window.addEventListener('load', () => renderRoute());
