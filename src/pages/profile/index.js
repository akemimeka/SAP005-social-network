import { Post } from '../../components/post/index.js';
import { getReviews } from '../../services/index.js';

export const Profile = () => {
  const profileBody = document.createElement('div');
  const profileHeader = document.createElement('header');
  const profileBodyNewReview = document.createElement('div');
  const user = firebase.auth().currentUser;
  profileBodyNewReview.className = 'review-container';
  profileHeader.className = 'profile-header';
  console.log(user);

  profileHeader.innerHTML = `
    <div id="profile-banner">IMG-BANNER</div>
    <div class="profile-user-info">
      <h2 id="profile-user-name">${user.displayName}</h2>
      <img class="profile-user-avatar" src="${user.photoURL || '../../img/default_user_icon.jpg'}">
      <figure class="profile-favorite-quote">
        <blockquote id="profile-quote-text">
        Minha liberdade é escrever. A palavra é o meu domínio sobre o mundo.
        </blockquote>
        <figcaption id="profile-quote-author">
          &mdash; Clarice Lispector
        </figcaption>
      </figure>
    </div>
  `;

  profileBodyNewReview.innerHTML = `
      <div class="first-review">
        <p class="first-review-text">
          Você ainda não possui nenhuma resenha cadastrada, clique no botão abaixo <i class="fas fa-plus-circle"></i> para criar sua primeira resenha!
        </p>
      </div>
  `;

  profileBody.appendChild(profileHeader);

  getReviews(false).then((reviews) => {
    if (!reviews.length) {
      profileBody.appendChild(profileBodyNewReview);
    }
    reviews.forEach((review) => {
      profileBody.appendChild(Post(review));
    });
  }).catch(() => {});
  return profileBody;
};
