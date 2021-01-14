import { Post } from '../../components/post/index.js';
import { getReviews } from '../../services/index.js';

export const Feed = () => {
  const feedBody = document.createElement('div');
  const feedHeader = document.createElement('header');

  feedHeader.innerHTML = '<h1 class="title">Livros</h1>';

  feedBody.appendChild(feedHeader);

  getReviews(true).then((reviews) => {
    reviews.forEach((review) => {
      feedBody.appendChild(Post(review));
    });
  }).catch(() => {});

  return feedBody;
};
