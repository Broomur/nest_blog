import { CommentModel } from './comment.model';

describe('CommentModel', () => {
		it(
			'should be defined',
			() => {
    expect(new CommentModel()).toBeDefined();
			}
		);
	});
