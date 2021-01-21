import { Feed } from './pages/feed';
import { SignUp } from './pages/signup';
import { Login } from './pages/login';
import { Review } from './pages/review';
import { Profile } from './pages/profile';
import { Navbar } from './components/navbar';
import { topHeaderNav } from './components/top-header';
import { Footer } from './components/footer';

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
    } else if (path === '/' || path === '/signup') {
      root.appendChild(Footer());
    }
  });
};

window.addEventListener('popstate', () => renderRoute());
window.addEventListener('load', () => renderRoute());
