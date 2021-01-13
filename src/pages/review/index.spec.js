import { Review } from './index.js';
import * as service from '../../services/index.js';

service.createReview = jest.fn(() => true);

describe('Review', () => {
  it('should be a function', () => {
    expect(typeof Review).toBe('function');
  });

  it('should load the page', () => {
    expect(Review()).toMatchSnapshot();
  });

  it('should have a button with click event to save the review', () => {
    Review().querySelector('#btn-review').dispatchEvent(new Event('click'));
    expect(service.createReview).toHaveBeenCalled();
    expect(service.createReview()).toBe(true);
  });
});
