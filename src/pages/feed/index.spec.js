import { Feed } from './index.js';
import * as post from '../../components/post/index.js';
import * as services from '../../services/index.js';

describe('Feed', () => {
  it('should be a function', () => {
    expect(typeof Feed).toBe('function');
  });

  it('should load the page', () => {
    services.getReviews = jest.fn(() => Promise.resolve(true));
    expect(Feed()).toMatchSnapshot();
  });

  it('should have return the header html when getReviews is empty', () => {
    services.getReviews = jest.fn(() => Promise.resolve([]));
    const result = Feed().innerHTML;
    expect(result).toBe('<header><h1 class="title">Livros</h1></header>');
  });

  it('should be called getReviews with true parameter', () => {
    services.getReviews = jest.fn(() => Promise.resolve([]));
    Feed();
    expect(services.getReviews).toHaveBeenCalledWith(true);
  });

  it('should be  called Post after called Feed and getReviews have true parameter', () => {
    services.getReviews = jest.fn(() => Promise.resolve([{}]));
    post.Post = jest.fn(() => document.createElement('div'));
    Feed();
    expect(services.getReviews).toHaveBeenCalledWith(true);
  });
});
