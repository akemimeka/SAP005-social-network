// profile test

import { Profile } from '.';
import * as post from '../../components/post';
import * as services from '../../services';

describe('Profile', () => {
  it('should be a function', () => {
    expect(typeof Profile).toBe('function');
  });

  it('should load the page', () => {
    services.getReviews = jest.fn(() => Promise.resolve(true));
    expect(Profile()).toMatchSnapshot();
  });

  it('should be called getReviews once times after called profile', () => {
    services.getReviews = jest.fn(() => Promise.resolve([]));
    Profile();
    expect(services.getReviews).toHaveBeenCalledTimes(1);
  });

  it('should be called getReviews with false parameter', () => {
    services.getReviews = jest.fn(() => Promise.resolve([]));
    Profile();
    expect(services.getReviews).toHaveBeenCalledWith(false);
  });

  it('should be  called Post after called Feed and getReviews have false parameter', () => {
    services.getReviews = jest.fn(() => Promise.resolve([{}]));
    post.Post = jest.fn(() => document.createElement('div'));
    Profile();
    expect(services.getReviews).toHaveBeenCalledWith(false);
  });
});
