import { createReview } from '../../services/index.js';

export const Review = () => {
  const rootElement = document.createElement('div');

  rootElement.className = 'container';
  rootElement.innerHTML = `
      <header>
        <h2 class="title-review">Publicar nova resenha</h2>
      </header>
      <section>
        <form class="form-review">
        <label class="label-review">Livro: <span class="required">*</span></label>
        <input type="text" class="input-book" id="book-name" name="book" required>
        <label class="label-review">Autor(a): <span class="required">*</span></label>
        <input type="text" class="input-book" id="book-author" name="author" required>
        <label class="label-review">Resenha: <span class="required">*</span></label>
        <textarea class="review" id="book-review" required></textarea>
        <button type="submit" class="btn-review" id="btn-review">Publicar</button>
        </form>
      <section>
  `;

  const reviewButton = rootElement.querySelector('#btn-review');
  reviewButton.addEventListener('click', createReview);

  return rootElement;
};
