import { Feed } from './pages/feed/index.js';
import { SignUp } from './pages/signup/index.js';
import { Login } from './pages/login/index.js';
import { Review } from './pages/review/index.js';
import { Profile } from './pages/profile/index.js';
import { Navbar } from './components/navbar/index.js';
import { topHeaderNav } from './components/top-header/index.js';

const root = document.querySelector('#root');
const auth = firebase.auth();

const routes = {
  '/': Login,
  '/feed': Feed,
  '/signup': SignUp,
  '/review': Review,
  '/profile': Profile,
};

const renderRoute = () => {
  auth.onAuthStateChanged((user) => {
    let path = window.location.pathname;
    if (!user && path !== '/signup') {
      path = '/';
      window.history.replaceState(null, null, path);
    }
    if (user && (path === '/' || path === '/signup')) {
      path = '/feed';
      window.history.replaceState(null, null, path);
    }
    root.innerHTML = '';
    root.appendChild(routes[path]());
    if (path === '/feed' || path === '/review' || path === '/profile') {
      root.appendChild(Navbar());
      root.appendChild(topHeaderNav());
    }
  });
};

window.addEventListener('popstate', () => renderRoute());
window.addEventListener('load', () => renderRoute());
