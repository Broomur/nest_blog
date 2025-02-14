import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_REPOSITORY_INTERFACE, ArticleRepositoryInterface } from 'src/domaine/interfaces/article.repository.interface/article.repository.interface';
import { ArticleDto, CreateArticleDto, UpdateArticleDto } from './article.dto/article.dto';
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

	async create(articleDto: CreateArticleDto): Promise<ArticleDto> {
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

	async update(articleDto: UpdateArticleDto): Promise<ArticleDto> {
		const { title, content } = plainToInstance(
			UpdateArticleDto,
			articleDto
		);
		const article = await this.articleRepository.update(
			articleDto.id,
			{ title, content }
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
