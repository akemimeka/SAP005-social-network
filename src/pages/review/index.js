import { createReview } from '../../services/index.js';

export const Review = () => {
  const rootElement = document.createElement('div');

  rootElement.className = 'container-review';
  rootElement.innerHTML = `
      <header>
        <h2 class="title-review">Publicar nova resenha</h2>
      </header>
        <form class="form-review" id="form-review">
          <label class="label-review">Título <span class="required">*</span></label>
          <input type="text" class="input-review" id="book-name" name="book" required>
          <label class="label-review">Autor(a) <span class="required">*</span></label>
          <input type="text" class="input-review" id="book-author" name="author" required>
          <label class="label-review">Resenha <span class="required">*</span></label>
          <textarea class="input-review" id="book-review" rows="5" required></textarea>
          <button type="submit" class="btn-review" id="btn-review">Publicar</button>
        </form>
  `;

  const formReview = rootElement.querySelector('#form-review');
  const bookName = rootElement.querySelector('#book-name');
  const bookAuthor = rootElement.querySelector('#book-author');
  const bookReview = rootElement.querySelector('#book-review');
  const reviewButton = rootElement.querySelector('#btn-review');

  reviewButton.addEventListener('click', (event) => {
    event.preventDefault();
    const titleValue = bookName.value;
    const authorValue = bookAuthor.value;
    const reviewValue = bookReview.value.replace(/\n/g, '<br>\n');
    createReview(formReview, titleValue, authorValue, reviewValue);
  });

  return rootElement;
};
