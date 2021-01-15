import { signOut } from '../../services/index.js';

export const topHeaderNav = () => {
  const topHeader = document.createElement('header');
  topHeader.setAttribute('id', 'top-header');
  topHeader.classList.add('top-header');

  topHeader.innerHTML = `
    <img class="logo-header" src='../../img/logo-written-dark.png' alt="Logo Bookshelf"/>
    <i id="icon-sign-out" class="icon-top-header fas fa-sign-out-alt"></i>
  `;

  topHeader.querySelector('#icon-sign-out')
    .addEventListener('click', () => {
      signOut();
    });

  return topHeader;
};
