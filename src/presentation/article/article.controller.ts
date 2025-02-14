import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ArticleService } from 'src/application/article/article.service';
import { ArticleDto, CreateArticleDto, UpdateArticleDto } from 'src/application/article/article.dto/article.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('articles')
export class ArticleController {
	constructor(private articleService: ArticleService) {}

	@Get()
	@HttpCode(200)
	async getAll(): Promise<ArticleDto[]> {
		return this.articleService.getAll();
	}

	@UseGuards(AuthGuard)
	@Post()
	@HttpCode(201)
	async create(@Body() articleDto: CreateArticleDto): Promise<ArticleDto> {
		return await this.articleService.create(articleDto);
	}

	@UseGuards(AuthGuard)
	@Post('/update')
	@HttpCode(200)
	async update(@Body() articleDto: UpdateArticleDto): Promise<ArticleDto> {
		return await this.articleService.update(articleDto);
	}

	@UseGuards(AuthGuard)
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
