import {
  saveEditedReview,
  deleteReview,
  likeReview,
  // updateLike,
} from '../../services/index.js';

export const Post = (review) => {
  const postContainer = document.createElement('div');
  postContainer.className = 'post-container';
  const currentUserId = firebase.auth().currentUser.uid;
  const post = review.data();
  const user = post.user_information;

  postContainer.innerHTML = `
    <article class="review-post" data-user-id=${user.user_id} data-review-id=${review.id}>
      <h3 class="review-meta-info">
        <div class="meta-info-container">
          <img id="review-user-avatar" class="review-user-avatar" src="${user.photo || '../../img/default_user_icon.jpg'}">
          <div>
            <span id="review-author-username" class="review-author-username">${user.name}</span>
            <time id="review-date" class="review-date">${post.date}</time>
          </div>
        </div>
        <div class="top-icons-container" id="buttons-container"></div>
      </h3>
      <div class="review-main-info">
        <div class="review-info-book-title">Livro:
          <p id="review-book-title-${review.id}" class="review-book-title">${post.title}</p>
        </div>
        <div class="review-info-book-author">Autor(a):
          <p id="review-book-author-${review.id}" class="review-book-author">${post.author}</p>
        </div>
        <div id="review-opinion-${review.id}" class="review-opinion">
          <p>${post.review}</p>
        </div>
      </div>
      <div id="like-container" class="like-container">
        <span id="like-icon-wrap">
          <i id="like-icon-${review.id}" class="like-icon far fa-heart"></i>
        </span>
        <div id="review-like-count-${review.id}">${post.likes}</div>
      </div>
    </article>
  `;

  const likeIconWrap = postContainer.querySelector('#like-icon-wrap');
  const likeIcon = likeIconWrap.querySelector(`#like-icon-${review.id}`);
  const likeCountWrap = postContainer.querySelector(`#review-like-count-${review.id}`);
  const likeCount = Number(post.likes);
  const docRef = firebase.firestore().doc(`reviews/${review.id}`);

  likeIcon.addEventListener('click', () => {
    likeIcon.className = 'like-icon fas fa-heart';
    likeReview(review.id);
  });

  // const updateLike = () => {
  //   docRef.onSnapshot((doc) => {
  //     const myData = doc.data();
  //     likeCountWrap.textContent = myData.likes;
  //   });
  // };

  // updateLike();

  if (currentUserId === user.user_id) {
    const buttonsContainer = postContainer.querySelector('#buttons-container');
    buttonsContainer.innerHTML = `
      <button id="edit-button-${review.id}" class="edit-button">
        <i class="edit-icon fas fa-edit"></i>Editar resenha
      </button>
      <button id="save-button-${review.id}" class="hidden save-button">
        <i class="check-icon fas fa-check"></i>Salvar resenha
      </button>
      <button id="cancel-button-${review.id}" class="hidden cancel-button">
        <i class="cancel-icon fas fa-times"></i>Cancelar edição
      </button>
      <button id="delete-button-${review.id}" class="delete-button">
        <i class="delete-icon fas fa-trash-alt"></i>Deletar resenha
      </button>
    `;

    likeIconWrap.innerHTML = `
      <i id="user-like-icon-${review.id}" class="like-icon far fa-heart"></i>
    `;

    const editButton = postContainer.querySelector(`#edit-button-${review.id}`);
    const deleteButton = postContainer.querySelector(`#delete-button-${review.id}`);
    const saveButton = postContainer.querySelector(`#save-button-${review.id}`);
    const cancelButton = postContainer.querySelector(`#cancel-button-${review.id}`);
    const reviewBookTitle = postContainer.querySelector(`#review-book-title-${review.id}`);
    const reviewBookAuthor = postContainer.querySelector(`#review-book-author-${review.id}`);
    const reviewText = postContainer.querySelector(`#review-opinion-${review.id}`);
    const userLikeIcon = postContainer.querySelector(`#user-like-icon-${review.id}`);
    const fieldList = [reviewBookTitle, reviewBookAuthor, reviewText];

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

    editButton.addEventListener('click', () => {
      fieldList.forEach((field) => changeToEditableField(field));
      reviewBookTitle.focus();
      editingButtons(editButton, deleteButton, saveButton, cancelButton);
    });

    cancelButton.addEventListener('click', () => {
      fieldList.forEach((field) => backToNormalField(field));
      initialButtons(editButton, deleteButton, saveButton, cancelButton);
    });

    saveButton.addEventListener('click', () => {
      const editedTitle = reviewBookTitle.innerText;
      const editedAuthor = reviewBookAuthor.innerText;
      const editedReview = reviewText.innerText;
      saveEditedReview(review.id, editedTitle, editedAuthor, editedReview);

      fieldList.forEach((field) => backToNormalField(field));
      initialButtons(editButton, deleteButton, saveButton, cancelButton);
    });

    deleteButton.addEventListener('click', () => {
      const popupToDelete = window.confirm('Tem certeza que você deseja deletar essa resenha?');
      if (popupToDelete) {
        postContainer.querySelector(`[data-review-id='${review.id}']`).remove();
        deleteReview(review.id);
      }
    });

    userLikeIcon.classList.add('current-user-like-icon');
  }

  return postContainer;
};
