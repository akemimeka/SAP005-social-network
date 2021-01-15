import { onNavigate } from '../../utils/history.js';

export const Navbar = () => {
  const navbar = document.createElement('nav');
  navbar.setAttribute('id', 'bottom-nav');

  navbar.innerHTML = `
    <div class="responsive-wrap-navbar">
      <i id="icon-nav-feed" class="icon-nav fas fa-home"></i>
      <i id="icon-nav-review" class="icon-nav fas fa-plus-circle"></i>
      <i id="icon-nav-profile" class="icon-nav fas fa-user-circle"></i>
    </div>
  `;

  navbar.querySelector('#icon-nav-feed')
    .addEventListener('click', () => {
      onNavigate('/feed');
    });

  navbar.querySelector('#icon-nav-review')
    .addEventListener('click', () => {
      onNavigate('/review');
    });

  navbar.querySelector('#icon-nav-profile')
    .addEventListener('click', () => {
      onNavigate('/profile');
    });

  return navbar;
};
