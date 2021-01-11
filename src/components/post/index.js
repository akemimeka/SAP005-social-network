import {
  saveEditedReview,
  getReviews,
  deleteReview,
  likeReview,
} from '../../services/index.js';

export const Post = (isGetAll) => {
  const postContainer = document.createElement('div');
  postContainer.className = 'post-container';

  getReviews(isGetAll).then((reviews) => {
    if (!reviews.length) {
      alert('Você ainda não possui nenhuma resenha cadastrada. Clique no botão de adicionar e crie uma resenha!');
    }
    const currentUserId = firebase.auth().currentUser.uid;
    Object.entries(reviews).forEach(([i, review]) => {
      const post = review.data();
      const user = post.user_information;

      postContainer.innerHTML += `
        <article class="review-post" data-user-id=${user.user_id} data-review-id=${review.id} data-index=${i}>
          <h3 class="review-meta-info">
            <div class="meta-info-container">
              <img id="review-user-avatar" class="review-user-avatar" src="${user.photo || '../../img/default_user_icon.jpg'}">
              <div>
                <span id="review-author-username" class="review-author-username">${user.name}</span>
                <time id="review-date" class="review-date">${post.date}</time>
              </div>
            </div>
            <div class="top-icons-container" id="buttons-container">
              ${currentUserId === user.user_id ? `<button id="edit-button" class="edit-button"><i class="edit-icon fas fa-edit"></i>Editar resenha</button>
                <button id="save-button" class="hidden save-button"><i class="check-icon fas fa-check"></i>Salvar resenha</button>
                <button id="cancel-button" class="hidden cancel-button"><i class="cancel-icon fas fa-times"></i>Cancelar edição</button>
                <button id="delete-button" class="delete-button"><i class="delete-icon fas fa-trash-alt"></i>Deletar resenha</button>` : ''}
              </div>
          </h3>
          <div class="review-main-info">
            <div class="review-info-book-title">Livro:
              <p id="review-book-title" class="review-book-title">${post.title}</p>
            </div>
            <div class="review-info-book-author">Autor(a):
              <p id="review-book-author" class="review-book-author">${post.author}</p>
            </div>
            <div id="review-opinion" class="review-opinion">
              <p>${post.review}</p>
            </div>
          </div>
          <div class="like-container">
          ${currentUserId === user.user_id ? `<i id="like-icon" class="far fa-heart"></i><div id="review-like-count">${post.likes}</div>` : `
            <i id="like-icon" class="like-icon far fa-heart"></i>
            <div id="review-like-count">${post.likes}</div>`}
          </div>
        </article>
      `;
    });

    const editButtons = postContainer.querySelectorAll('.edit-button');
    const deleteButtons = postContainer.querySelectorAll('.delete-button');
    const likeIcon = postContainer.querySelectorAll('.like-icon');

    const changeToEditableField = (element) => {
      element.setAttribute('contenteditable', 'true');
      element.classList.add('editable-content');
    };

    const backToNormalField = (element) => {
      element.removeAttribute('contenteditable');
      element.classList.remove('editable-content');
    };

    const initialButtons = (editBtn, deleteBtn, saveBtn, cancelBtn) => {
      editBtn.classList.remove('hidden');
      deleteBtn.classList.remove('hidden');
      saveBtn.classList.add('hidden');
      cancelBtn.classList.add('hidden');
    };

    const editingButtons = (editBtn, deleteBtn, saveBtn, cancelBtn) => {
      editBtn.classList.add('hidden');
      deleteBtn.classList.add('hidden');
      saveBtn.classList.remove('hidden');
      cancelBtn.classList.remove('hidden');
    };

    editButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const targetPost = event.target.closest('article');
        const targetReviewId = targetPost.dataset.reviewId;
        const targetEditBtn = targetPost.querySelector('#edit-button');
        const targetSaveBtn = targetPost.querySelector('#save-button');
        const targetCancelBtn = targetPost.querySelector('#cancel-button');
        const targetDeleteBtn = targetPost.querySelector('#delete-button');
        const reviewBookTitle = targetPost.querySelector('#review-book-title');
        const reviewBookAuthor = targetPost.querySelector('#review-book-author');
        const reviewText = targetPost.querySelector('#review-opinion');
        const fieldList = [reviewBookTitle, reviewBookAuthor, reviewText];
        fieldList.forEach((field) => changeToEditableField(field));
        reviewBookTitle.focus();
        editingButtons(targetEditBtn, targetDeleteBtn, targetSaveBtn, targetCancelBtn);

        targetCancelBtn.addEventListener('click', () => {
          fieldList.forEach((field) => backToNormalField(field));
          initialButtons(targetEditBtn, targetDeleteBtn, targetSaveBtn, targetCancelBtn);
        });

        targetSaveBtn.addEventListener('click', () => {
          const editedTitle = reviewBookTitle.innerText;
          const editedAuthor = reviewBookAuthor.innerText;
          const editedReview = reviewText.innerText;
          saveEditedReview(targetReviewId, editedTitle, editedAuthor, editedReview);

          fieldList.forEach((field) => backToNormalField(field));
          initialButtons(targetEditBtn, targetDeleteBtn, targetSaveBtn, targetCancelBtn);
        });
      });
    });

    deleteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const targetPost = event.target.closest('article');
        const targetReviewId = targetPost.dataset.reviewId;
        const popupToDelete = window.confirm('Tem certeza que você deseja deletar essa resenha?');
        if (popupToDelete) {
          deleteReview(targetReviewId);
        }
      });
    });

    likeIcon.forEach((icon) => {
      icon.addEventListener('click', (event) => {
        const targetPost = event.target.closest('article');
        const targetReviewId = targetPost.dataset.reviewId;

        likeReview(targetReviewId);
      });
    });
  });

  return postContainer;
};
