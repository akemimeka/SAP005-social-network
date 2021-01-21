import { Post } from '../../components/post';
import { getReviews } from '../../services';

export const Feed = () => {
  const feedBody = document.createElement('div');
  const feedHeader = document.createElement('header');
  feedHeader.classList.add('feed-header');

  feedHeader.innerHTML = `
    <img class="feed-img" alt="Ilustração de uma mulher lendo, sentada no chão." src="../../img/feed-top-img.png" />
  `;

  feedBody.appendChild(feedHeader);

  getReviews(true).then((reviews) => {
    reviews.forEach((review) => {
      feedBody.appendChild(Post(review));
    });
  }).catch(() => {});

  return feedBody;
};
