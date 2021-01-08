import { onNavigate } from '../../utils/history.js';
import { signOut } from '../../services/index.js';

export const TopNavbar = () => {
  const topNavbar = document.createElement('nav');
  topNavbar.setAttribute('id', 'top-nav');

  topNavbar.innerHTML = `
    <i id="icon-sign-out" class="icon-top-nav fas fa-sign-out-alt"></i>
  `;

  topNavbar.querySelector('#icon-sign-out')
    .addEventListener('click', () => {
      signOut();
      onNavigate('/');
    });

  return topNavbar;
};
