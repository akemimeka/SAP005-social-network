import { Post } from '../../components/post';
import { getReviews } from '../../services';

export const Profile = () => {
  const profileBody = document.createElement('div');
  const profileHeader = document.createElement('header');
  const profileBodyNewReview = document.createElement('div');
  const user = firebase.auth().currentUser;
  profileBodyNewReview.className = 'review-container';
  profileHeader.className = 'profile-header';

  profileHeader.innerHTML = `
    <img id="profile-banner" class="profile-cover" alt="Capa de perfil" src='../../img/profile-cover-img.png' />
    <div class="profile-user-info">
      <p id="profile-user-name" class="user-name">${user.displayName}</p>
      <figure class="profile-favorite-quote">
        <blockquote id="profile-quote-text" class="quote-text">
        "Minha liberdade é escrever. <br> A palavra é o meu domínio sobre o mundo."
        </blockquote>
        <figcaption id="profile-quote-author class="quote-author">
          &mdash; Clarice Lispector
        </figcaption>
      </figure>
    </div>
  `;

  profileBodyNewReview.innerHTML = `
      <div class="first-review">
        <p class="first-review-text">
          Você ainda não opinou a respeito de nenhum livro. Clique no ícone <i class="fas fa-plus-circle"></i> abaixo para criar sua primeira resenha!
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
