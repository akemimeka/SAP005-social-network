import { saveEditedReview, getReviews } from '../../services/index.js';

export const Post = (isGetAll) => {
  const postContainer = document.createElement('div');
  postContainer.className = 'post-container';

  getReviews(isGetAll).then((reviews) => {
    if (!reviews.length) {
      alert('Você ainda não possui nenhuma resenha cadastrada. Clique no botão de adicionar e crie uma resenha!');
    }
    Object.entries(reviews).forEach(([i, review]) => {
      const post = review.data();
      let userPhoto = post.user_information.photo;
      if (!userPhoto) { userPhoto = '../../img/default_user_icon.jpg'; }

      postContainer.innerHTML += `
        <article class="review-post">
          <h3 class="review-meta-info">
            <div class="meta-info-container">
              <img id="review-user-avatar_${i}" class="review-user-avatar" src="${userPhoto}">
              <div>
                <span id="review-author-username_${i}" class="review-author-username">${post.user_information.name}</span>
                <time id="review-date_${i}" class="review-date">${post.date}</time>
              </div>
            </div>
            <div class="top-icons-container">
              <button id="edit-button_${i}" class="edit-button"><i class="edit-icon fas fa-edit"></i>Editar resenha</button>
              <button id="save-button_${i}" class="hidden save-button"><i class="check-icon fas fa-check"></i>Salvar resenha</button>
              <button id="delete-button_${i}" class="delete-button"><i class="delete-icon fas fa-trash-alt"></i>Deletar resenha</button>
            </div>
          </h3>
          <div class="review-main-info">
            <div class="review-info-book-title">
              Livro: <span id="review-book-title_${i}">${post.title}</span>
            </div>
            <div class="review-info-book-author">
              Autor(a): <span id="review-book-author_${i}">${post.author}</span>
            </div>
            <div id="review-opinion_${i}">
              <p>${post.review}</p>
            </div>
          </div>
          <div class="like-container">
            <i id="like-icon_${i}" class="like-icon far fa-heart"></i>
            <div id="review-like-count_${i}">32</div>
          </div>
        </article>
      `;

      const editButton = postContainer.querySelector(`#edit-button_${i}`);
      const saveButton = postContainer.querySelector(`#save-button_${i}`);
      const deleteButton = postContainer.querySelector(`#delete-button_${i}`);
      const reviewBookTitle = postContainer.querySelector(`#review-book-title_${i}`);
      const reviewBookAuthor = postContainer.querySelector(`#review-book-author_${i}`);
      const reviewText = postContainer.querySelector(`#review-opinion_${i}`);
      const likeIcon = postContainer.querySelector(`#like-icon_${i}`);

      const editStylingToggle = (element) => {
        element.setAttribute('contenteditable', 'true');
        element.classList.toggle('editable-content');
      };

      editButton.addEventListener('click', () => {
        const fieldList = [reviewBookTitle, reviewBookAuthor, reviewText];

        fieldList.forEach((field) => editStylingToggle(field));
        reviewBookTitle.focus();
        editButton.classList.toggle('hidden');
        saveButton.classList.remove('hidden');
      });

      saveButton.addEventListener('click', saveEditedReview);

      deleteButton.addEventListener('click', () => {
        const popupToDelete = window.confirm('Tem certeza que você deseja deletar essa resenha?');
        if (popupToDelete) {
          // função para deletar resenha
        }
      });

      likeIcon.addEventListener('click', () => {
        // função para adicionar like
      });
    });
  });

  return postContainer;
};
