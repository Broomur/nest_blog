import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_REPOSITORY_INTERFACE, ArticleRepositoryInterface } from 'src/domaine/interfaces/article.repository.interface/article.repository.interface';
import { ArticleDto } from './article.dto/article.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ArticleService {
	constructor(@Inject(ARTICLE_REPOSITORY_INTERFACE) private articleRepository: ArticleRepositoryInterface) {}

	async getAll(): Promise<ArticleDto[]> {
		const articles = await this.articleRepository.getAll();
		return plainToInstance(
			ArticleDto,
			articles,
			{ excludeExtraneousValues: true }
		);
	}

	async create(articleDto: ArticleDto): Promise<ArticleDto> {
		const article = await this.articleRepository.create(
			articleDto.title,
			articleDto.content,
			articleDto.owner_id
		);
		return plainToInstance(
			ArticleDto,
			article,
			{ excludeExtraneousValues: true }
		);
	}

	async delete(articleId: number): Promise<boolean> {
		return await this.articleRepository.delete(articleId);
	}
}
