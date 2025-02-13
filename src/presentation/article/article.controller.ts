import { Controller, Get } from '@nestjs/common';
import { ArticleService } from 'src/application/article/article.service';

@Controller('articles')
export class ArticleController {
	constructor(private articleService: ArticleService) {}

	@Get()
	async getArticles(): Promise<object[]> {
		return this.articleService.getArticles();
	}
}
