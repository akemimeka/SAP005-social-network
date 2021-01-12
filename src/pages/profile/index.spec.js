import { Profile } from './index.js';
import { getReviews } from '../../services/index.js';

describe('profile', () => {
  it('should be a function', () => {
    expect(typeof Profile).toBe('function');
  });
});

describe('getReviews', () => {
  it('getReviews should be a function', () => {
    expect(typeof getReviews).toBe('function');
  });
});
