import { Post } from '../../components/post/index.js';

export const Feed = () => {
  const feedBody = document.createElement('div');
  const feedHeader = document.createElement('header');

  feedHeader.innerHTML = `
    <h1 class="title">Livros</h1>
  `;

  feedBody.appendChild(feedHeader);
  feedBody.appendChild(Post(true));

  return feedBody;
};
