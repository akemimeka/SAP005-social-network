export const NewPost = () => {
  const newPostContainer = document.createElement('article');
  newPostContainer.className = 'new-post review-post';

  newPostContainer.innerHTML = `
    <h3 class="new-post-title">Nova resenha</h3>
    <label class="new-post-label" for="new-post-book-title">Livro</label>
    <input type="text" required id="new-post-book-title" class="new-post-input"></input>
    <label class="new-post-label" for="new-post-author">Autor(a)</label>
    <input type="text" required id="new-post-author" class="new-post-input"></input>
    <label class="new-post-label" for="new-post-review">Resenha</label>
    <textarea id="new-post-review" required rows="5" class="new-post-input"></textarea>
    <button id="new-post-button">Enviar</button>
  `;

  return newPostContainer;
};
