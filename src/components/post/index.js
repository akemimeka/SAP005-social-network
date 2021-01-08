import { editReview } from '../../services/index.js';

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
          <i id="icon-edit" class="icon-review fas fa-edit"></i>
          <i id="icon-delete" class="icon-review fas fa-trash-alt"></i>
        </div>
      </h3>
      <div class="review-main-info">
        <div class="review-info-book-title">
          Livro: <span id="review-book-title">A Coragem de Ser Imperfeito</span>
        </div>
        <div class="review-info-book-author">
          Autor(a): <span id="review-book-author">Brené Brown</span>
        </div>
        <div id="review-info-book-opinion">
          <p>
            Não se deixe enganar pela pegada autoajuda da obra. A Coragem de Ser Imperfeito é muito maior do que o gênero literário, apesar de ser também em determinada medida, um livro autoajuda. Como mencionei no parágrafo anterior, Brené Brown passou treze anos estudando o tema que permeia seus livros. Passou esses anos empregando uma metodologia acadêmica para a coletânea de dados, bem como para a abordagem de suas informações e pesquisas. A autora conversou com pessoas comuns, conversou com pais e professores, alunos, homens e mulheres que passavam, passaram com toda a certeza ainda passam por experiências relacionadas a vergonha e a vulnerabilidade. Mas ela foi mais fundo do que isso, além de entender, teorizar, organizar os dados que colheu, ela observa a sociedade e mostra que, mais uma vez, tudo está intimamente conectado.
          </p>
          <br>
          <p>
            Ao nos mostrar o que é a vulnerabilidade, ela nos mostra também toda a carga positiva que podemos receber ao entrar com a cara e a coragem na arena da vida. Ao encorajar atos e ações, ao mostrar que somos imperfeitos e mostrar que não existe problema algum em se tornar, se mostrar vulnerável, ela também analisa como a sociedade, mesmo que indiretamente, julga e entende as tão assustadoras vulnerabilidade e vergonha. Muito mais do que trazer regras para uma vida melhor, conselhos para encontrar o amor, a paz interior e a coragem para ser imperfeito, a autora observa a sociedade e nos mostra que somos como somos por algo muito maior do que as tristezas da vida e os desencontros amorosos. As patologias encontradas na sociedade, reproduzidas no ambiente familiar, de trabalho e até nos relacionamentos amorosos, acaba nos distanciando de tudo o que deveria estar sempre em nosso campo de visão. Conselhos irão aparecer com toda a certeza, afinal, como disse, este também é um livro autoajuda, porém é através da observação, da análise do problema como um todo, dos exemplos e histórias de pessoas como nós, e de como a sociedade se manifesta que, guiados pelas palavras da autora, seremos capazes de encontrar nosso próprio caminho para uma vida plena.
          </p>
        </div>
      </div>
      <div class="like-icon-container">
        <i id="icon-like" class="icon-review far fa-heart"></i>
      </div>
    </article>
  `;

  // const likeIcon = document.querySelector('#icon-like');
  // likeIcon.addEventListener('click', likeReview);

  const editIcon = postContainer.querySelector('#icon-edit');
  editIcon.addEventListener('click', editReview);

  // const deleteIcon = document.querySelector('#icon-delete');
  // deleteIcon.addEventListener('click', deleteReview);

  return postContainer;
};
