//import { onNavigate } from './utils/history.js';
import { Feed } from './pages/feed/index.js';
import { SignUp } from './pages/signup/index.js';
import { Login } from './pages/login/index.js';
import { Review } from './pages/review/index.js';
import { Profile } from './pages/profile/index.js';
import { Navbar } from './components/navbar/index.js';
import { verifyLogin} from './services/index.js';

const root = document.querySelector('#root');

const routes = {
  '/': Login,
  '/feed': Feed,
  '/signup': SignUp,
  '/review': Review,
  '/profile': Profile,
};

const renderRoute = () => {
  verifyLogin();
  const path = window.location.pathname;
  root.innerHTML = '';
  root.appendChild(routes[path]());
  if (path === '/feed' || path === '/new-post' || path === '/profile') {
    root.appendChild(Navbar());
  }
};

window.addEventListener('popstate', () => renderRoute());
window.addEventListener('load', () => renderRoute());