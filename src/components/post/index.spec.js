import * as post from './index.js';
import * as services from '../../services/index.js';

const reviewMock = {
  id: '123',
  data: () => ({
    author: 'George Orwell',
    date: '12/01/2021 16:27:18',
    likes: '1',
    review: 'lorem ipsum',
    title: '1984',
    user_information: {
      name: 'João',
      photo: '/default.jpg',
      user_id: 1,
    },
  }),
};

describe('Post', () => {
  it('should be a function', () => {
    expect(typeof post.Post).toBe('function');
  });

  it('should load the page', () => {
    expect(post.Post(reviewMock)).toMatchSnapshot();
  });

  it('should have a user id equal to current user id', () => {
    const postElement = post.Post(reviewMock);
    expect(postElement.querySelector(`#edit-button-${reviewMock.id}`)).not.toBeUndefined();
    expect(postElement.querySelector(`#delete-button-${reviewMock.id}`)).not.toBeUndefined();
  });

  it('should have a button with click event to delete review', () => {
    window.confirm = jest.fn(() => true);
    services.deleteReview = jest.fn(() => true);
    const postElement = post.Post(reviewMock);
    postElement.querySelector(`#delete-button-${reviewMock.id}`).dispatchEvent(new Event('click'));
    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(services.deleteReview).toHaveBeenCalledTimes(1);
  });

  it('should have a button with click event to save review', () => {
    services.saveEditedReview = jest.fn(() => true);
    const postElement = post.Post(reviewMock);
    postElement.querySelector(`#save-button-${reviewMock.id}`).dispatchEvent(new Event('click'));
    expect(services.saveEditedReview).toHaveBeenCalledTimes(1);
  });

  it('should have a button with click event to like review', () => {
    const reviewMockLike = {
      id: '123',
      data: () => ({
        author: 'George Orwell',
        date: '12/01/2021 16:27:18',
        likes: '1',
        review: 'lorem ipsum',
        title: '1984',
        user_information: {
          name: 'João',
          photo: '/default.jpg',
          user_id: 2,
        },
      }),
    };
    services.likeReview = jest.fn(() => true);
    const postElement = post.Post(reviewMockLike);
    postElement.querySelector(`#like-icon-${reviewMockLike.id}`).dispatchEvent(new Event('click'));
    expect(services.likeReview).toHaveBeenCalledTimes(1);
  });
});
