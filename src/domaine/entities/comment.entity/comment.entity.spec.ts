import { CommentEntity } from './comment.entity';

describe(
	'CommentEntity',
	() => {
		const commentEntity = new CommentEntity(
			1,
			'test',
			new Date(),
			new Date(),
			1,
			1
		);
		it(
			'should be defined',
			() => {
				expect(commentEntity).toBeDefined();
			}
		);
	}
);
