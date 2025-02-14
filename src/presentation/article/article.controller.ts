import { Body, Controller, Delete, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ArticleService } from 'src/application/article/article.service';
import { ArticleDto } from 'src/application/article/dto/article.dto/article.dto';

@Controller('articles')
export class ArticleController {
	constructor(private articleService: ArticleService) {}

	@Get()
	@HttpCode(200)
	async getAll(): Promise<object[]> {
		return this.articleService.getAll();
	}

	@Post()
	@HttpCode(201)
	async create(@Body() articleDto: ArticleDto): Promise<ArticleDto> {
		return this.articleService.create(articleDto);
	}

	@Delete()
	@HttpCode(204)
	async delete(@Query('id') id: string): Promise<boolean> {
		return await this.articleService.delete(id);
	}
}
