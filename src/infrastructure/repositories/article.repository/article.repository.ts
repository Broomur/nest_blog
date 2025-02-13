import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepositoryInterface } from 'src/domaine/interfaces/article.repository.interface/article.repository.interface';
import { ArticleModel } from 'src/infrastructure/models/article.model/article.model';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ArticleRepository implements ArticleRepositoryInterface {
	constructor(@InjectRepository(ArticleModel) private articleRepository: Repository<ArticleModel>) {}


	async create(
		title: string, content: string, owner_id: string
	): Promise<ArticleModel> {
		const article = this.articleRepository.create({
			title: title,
			content: content,
			owner: { id: Number(owner_id) }
		});
		await this.articleRepository.save(article);
		return article;
	}

	async getById(id: string) : Promise<ArticleModel | null> {
		return await this.articleRepository.findOneBy({ id: id});
	}

	async getAll(): Promise<ArticleModel[]> {
		return await this.articleRepository.find();
	}

	async getByOwner(owner_id: string): Promise<ArticleModel[]> {
		return await this.articleRepository.findBy({
			owner_id: Number(owner_id)
		});
	}

	async update(
		id: string, data: QueryDeepPartialEntity<ArticleModel>
	): Promise<ArticleModel | null> {
		await this.articleRepository.update(
			{id},
			data
		);
		return await this.articleRepository.findOneBy({id});
	}

	async delete(id: string): Promise<boolean> {
		try {
			const result = await this.articleRepository.delete(id);
			return result.affected !== undefined && result.affected > 0;
		} catch {
			return false;
		}
	}
}
