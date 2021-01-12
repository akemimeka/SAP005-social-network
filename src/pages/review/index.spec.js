import { Review } from './index.js';
import { createReview } from '../../services/index.js';

describe('Review', () => {
  it('should be a function', () => {
    expect(typeof Review).toBe('function');
  });

  it('loads the page', () => {
    expect(Review()).toMatchSnapshot();
  });

  it('clicks to send review', () => {
    const reviewPage = Review();
    reviewPage.querySelector('#btn-review').dispatchEvent(new Event('click'));
    expect(createReview).toHaveBeenCalled();
  });
});
