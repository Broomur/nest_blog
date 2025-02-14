import { ArticleEntity } from './article.entity';

describe(
	'ArticleEntity',
	() => {
		const articleEntity = new ArticleEntity(
			1,
			'test',
			'test',
			new Date(),
			new Date(),
			1,
			[]
		);

		it(
			'should be defined',
			() => {
				expect(articleEntity).toBeDefined();
			}
		);
	}
);
