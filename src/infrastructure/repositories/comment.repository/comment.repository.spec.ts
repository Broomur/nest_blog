import { CommentRepository } from './comment.repository';

describe('CommentRepository', () => {
  it('should be defined', () => {
    expect(new CommentRepository()).toBeDefined();
  });
});
