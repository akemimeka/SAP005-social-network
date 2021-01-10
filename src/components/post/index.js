import { saveEditedReview, getReviews } from '../../services/index.js';

export const Post = (isGetAll) => {
  const postContainer = document.createElement('div');
  postContainer.className = 'post-container';

  getReviews(isGetAll).then((reviews) => {
    if (!reviews.length) {
      alert('Você ainda não possui nenhuma resenha cadastrada. Clique no botão de adicionar e crie uma resenha!');
    }
    Object.entries(reviews).forEach(([i, review]) => {
      // const reviewId = review.id;
      const post = review.data();
      const user = post.user_information;
      // console.log(reviewId, post);

      postContainer.innerHTML += `
        <article class="review-post" data-id=${user.user_id}>
          <h3 class="review-meta-info">
            <div class="meta-info-container">
              <img id="review-user-avatar" class="review-user-avatar" src="${user.photo || '../../img/default_user_icon.jpg'}">
              <div>
                <span id="review-author-username" class="review-author-username">${user.name}</span>
                <time id="review-date" class="review-date">${post.date}</time>
              </div>
            </div>
            <div class="top-icons-container">
              <button id="edit-button" class="edit-button"><i class="edit-icon fas fa-edit"></i>Editar resenha</button>
              <button id="save-button" class="hidden save-button"><i class="check-icon fas fa-check"></i>Salvar resenha</button>
              <button id="delete-button" class="delete-button"><i class="delete-icon fas fa-trash-alt"></i>Deletar resenha</button>
            </div>
          </h3>
          <div class="review-main-info">
            <div class="review-info-book-title">
              Livro: <span id="review-book-title" class="review-book-title">${post.title}</span>
            </div>
            <div class="review-info-book-author">
              Autor(a): <span id="review-book-author" class="review-book-author">${post.author}</span>
            </div>
            <div id="review-opinion" class="review-opinion">
              <p>${post.review}</p>
            </div>
          </div>
          <div class="like-container">
            <i id="like-icon" class="like-icon far fa-heart"></i>
            <div id="review-like-count">32</div>
          </div>
        </article>
      `;

      const editButton = postContainer.querySelectorAll('.edit-button');
      const saveButton = postContainer.querySelectorAll('.save-button');
      // const deleteButton = postContainer.querySelectorAll('.delete-button');
      // const likeIcon = postContainer.querySelectorAll('.like-icon');

      const editStylingToggle = (element) => {
        element.setAttribute('contenteditable', 'true');
        element.classList.toggle('editable-content');
      };

      editButton.forEach((button) => {
        button.addEventListener('click', (event) => {
          const targetPost = event.target.closest('article');
          const editButton = targetPost.querySelector('#edit-button');
          const saveButton = targetPost.querySelector('#save-button');
          const reviewBookTitle = targetPost.querySelector('#review-book-title');
          const reviewBookAuthor = targetPost.querySelector('#review-book-author');
          const reviewText = targetPost.querySelector('#review-opinion');
          const fieldList = [reviewBookTitle, reviewBookAuthor, reviewText];

          fieldList.forEach((field) => editStylingToggle(field));
          reviewBookTitle.focus();
          editButton.classList.toggle('hidden');
          saveButton.classList.remove('hidden');
        });
      });

      // saveButton.addEventListener('click', saveEditedReview);

      // deleteButton.addEventListener('click', () => {
      //   const popupToDelete = window.confirm('Tem certeza que você deseja deletar essa resenha?');
      //   if (popupToDelete) {
      //     // função para deletar resenha
      //   }
      // });

      // likeIcon.addEventListener('click', () => {
      //   // função para adicionar like
      // });
    });
  });

  return postContainer;
};
