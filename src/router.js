import { onNavigate } from './utils/history.js';
import { Feed } from './pages/feed/index.js';
import { SignUp } from './pages/signup/index.js';
import { Login } from './pages/login/index.js';
import { Review } from './pages/review/index.js';
import { Profile } from './pages/profile/index.js';

const root = document.querySelector('#root');

const routes = {
  '/': Login,
  '/feed': Feed,
  '/signup': SignUp,
  '/review': Review,
  '/profile': Profile,
};

const renderRoute = () => {
  root.innerHTML = '';
  root.appendChild(routes[window.location.pathname]());
};

export const redirectToPage = (path) => {
  onNavigate(path);
  renderRoute();
};

window.addEventListener('popstate', () => renderRoute());
window.addEventListener('load', () => renderRoute());