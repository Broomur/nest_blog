import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { ArticleService } from 'src/application/article/article.service';
import { ArticleDto } from 'src/application/article/article.dto/article.dto';

@Controller('articles')
export class ArticleController {
	constructor(private articleService: ArticleService) {}

	@Get()
	@HttpCode(200)
	async getAll(): Promise<ArticleDto[]> {
		return this.articleService.getAll();
	}

	@Post()
	@HttpCode(201)
	async create(@Body() articleDto: ArticleDto): Promise<ArticleDto> {
		return this.articleService.create(articleDto);
	}

	@Delete()
	@HttpCode(204)
	async delete(@Query('id') id: number): Promise<boolean> {
		const result = await this.articleService.delete(id);
		if (!result)
			throw new HttpException(
				'Not found',
				HttpStatus.NOT_FOUND
			);
		return result;
	}
}
