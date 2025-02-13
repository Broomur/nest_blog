import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_REPOSITORY_INTERFACE, ArticleRepositoryInterface } from 'src/domaine/interfaces/article.repository.interface/article.repository.interface';

@Injectable()
export class ArticleService {
	constructor(@Inject(ARTICLE_REPOSITORY_INTERFACE) private articleRepository: ArticleRepositoryInterface) {}

	async getArticles(): Promise<object[]> {
		return await this.articleRepository.getAll();
	}
}
