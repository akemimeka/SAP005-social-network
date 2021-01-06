import { Feed } from './pages/feed/index.js';
import { SignUp } from './pages/signup/index.js';
import { Login } from './pages/login/index.js';
import { Review } from './pages/review/index.js';
import { Profile } from './pages/profile/index.js';
import { Navbar } from './components/navbar/index.js';

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
    console.log(user);
    console.log(user);
    let path = window.location.pathname;
    if (!user) {
      path = '/';
      window.history.replaceState(null, null, path);
    }
    root.innerHTML = '';
    root.appendChild(routes[path]());
    if (path === '/feed' || path === '/new-post' || path === '/profile') {
      root.appendChild(Navbar());
    }
  }) 
};

window.addEventListener('popstate', () => renderRoute());
window.addEventListener('load', () => renderRoute());