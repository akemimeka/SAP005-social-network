import { saveEditedReview } from '../../services/index.js';

export const Post = () => {
  const postContainer = document.createElement('div');
  postContainer.className = 'post-container';

  postContainer.innerHTML = `
    <article class="review-post">
      <h3 class="review-meta-info">
        <div class="meta-info-container">
          <img id="review-user-avatar" src="../../img/default_user_icon.jpg">
          <div>
            <span id="review-author-username">Samara Tokki</span>
            <time id="review-date">03 de Janeiro às 14:33</time>
          </div>
        </div>
        <div class="top-icons-container">
          <button id="edit-button"><i class="edit-icon fas fa-edit"></i>Editar resenha</button>
          <button id="save-button" class="hidden"><i class="check-icon fas fa-check"></i>Salvar resenha</button>
          <button id="delete-button"><i class="delete-icon fas fa-trash-alt"></i>Deletar resenha</button>
        </div>
      </h3>
      <div class="review-main-info">
        <div class="review-info-book-title">
          Livro: <span id="review-book-title">A Coragem de Ser Imperfeito</span>
        </div>
        <div class="review-info-book-author">
          Autor(a): <span id="review-book-author">Brené Brown</span>
        </div>
        <div id="review-opinion">
          <p>
            Não se deixe enganar pela pegada autoajuda da obra. A Coragem de Ser Imperfeito é muito maior do que o gênero literário, apesar de ser também em determinada medida, um livro autoajuda. Como mencionei no parágrafo anterior, Brené Brown passou treze anos estudando o tema que permeia seus livros. Passou esses anos empregando uma metodologia acadêmica para a coletânea de dados, bem como para a abordagem de suas informações e pesquisas. A autora conversou com pessoas comuns, conversou com pais e professores, alunos, homens e mulheres que passavam, passaram com toda a certeza ainda passam por experiências relacionadas a vergonha e a vulnerabilidade. Mas ela foi mais fundo do que isso, além de entender, teorizar, organizar os dados que colheu, ela observa a sociedade e mostra que, mais uma vez, tudo está intimamente conectado.
          </p>
          <br>
          <p>
            Ao nos mostrar o que é a vulnerabilidade, ela nos mostra também toda a carga positiva que podemos receber ao entrar com a cara e a coragem na arena da vida. Ao encorajar atos e ações, ao mostrar que somos imperfeitos e mostrar que não existe problema algum em se tornar, se mostrar vulnerável, ela também analisa como a sociedade, mesmo que indiretamente, julga e entende as tão assustadoras vulnerabilidade e vergonha.
          </p>
        </div>
      </div>
      <div class="like-icon-container">
        <i id="like-icon" class="far fa-heart"></i>
        <div id="review-like-count">32</div>
      </div>
    </article>
  `;

  // const likeIcon = document.querySelector('#icon-like');
  // likeIcon.addEventListener('click', likeReview);

  // const deleteIcon = document.querySelector('#icon-delete');
  // deleteIcon.addEventListener('click', deleteReview);

  const editButton = postContainer.querySelector('#edit-button');
  const saveButton = postContainer.querySelector('#save-button');
  const reviewBookTitle = postContainer.querySelector('#review-book-title');
  const reviewBookAuthor = postContainer.querySelector('#review-book-author');
  const reviewText = postContainer.querySelector('#review-opinion');

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

  return postContainer;
};
