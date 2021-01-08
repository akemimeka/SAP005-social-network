import { onNavigate } from '../../utils/history.js';
import { signOut } from '../../services/index.js';

export const topHeader = () => {
  const topHeader = document.createElement('header');
  topHeader.setAttribute('id', 'top-header');

  topHeader.innerHTML = `
    <i id="icon-sign-out" class="icon-top-header fas fa-sign-out-alt"></i>
  `;

  topHeader.querySelector('#icon-sign-out')
    .addEventListener('click', () => {
      signOut();
      onNavigate('/');
    });

  return topHeader;
};
