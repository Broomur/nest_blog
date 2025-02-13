import { ArticleModel } from './article.model';

describe(
	'ArticleModel',
	() => {
		it(
			'should be defined',
			() => {
				expect(new ArticleModel()).toBeDefined();
			}
		);
	}
);
