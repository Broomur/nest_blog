import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '../../../domaine/entities/article.entity/article.entity';
import { ArticleRepositoryInterface } from '../../../domaine/interfaces/article.repository.interface/article.repository.interface';
import { ArticleModel } from '../../models/article.model/article.model';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleRepository implements ArticleRepositoryInterface {
	constructor(@InjectRepository(ArticleModel) private articleRepository: Repository<ArticleModel>) {}


	async create(
		title: string, content: string, owner_id: string
	): Promise<ArticleEntity> {
		const article = this.articleRepository.create({
			title: title,
			content: content,
			owner: { id: Number(owner_id) }
		});
		await this.articleRepository.save(article);
		const articleEntity = new ArticleEntity(
			article.id,
			article.title,
			article.content,
			article.created_at,
			article.updated_at,
			article.owner_id,
			(article.comments ?? []).map(c => c.id)
		);
		return articleEntity;
	}

	async getById(id: string) : Promise<ArticleEntity | null> {
		const article = await this.articleRepository.findOneBy({ id: parseInt(id) });
		if (article) {
			const articleEntity = new ArticleEntity(
				article.id,
				article.title,
				article.content,
				article.created_at,
				article.updated_at,
				article.owner_id,
				article.comments.map(c => c.id)
			);
			return articleEntity;
		}
		return null;
	}

	async getAll(): Promise<ArticleEntity[]> {
		const articles = await this.articleRepository.find();
		const articlesEntities = [];
		for (const article of articles) {
			articlesEntities.push(new ArticleEntity(
				article.id,
				article.title,
				article.content,
				article.created_at,
				article.updated_at,
				article.owner_id,
				article.comments.map(c => c.id)
			));
		}
		return articlesEntities;
	}

	async getByOwner(owner_id: string): Promise<ArticleEntity[]> {
		const articles = await this.articleRepository.findBy({
			owner_id: Number(owner_id)
		});
		const articlesEntities = [];
		for (const article of articles) {
			articlesEntities.push(new ArticleEntity(
				article.id,
				article.title,
				article.content,
				article.created_at,
				article.updated_at,
				article.owner_id,
				article.comments.map(c => c.id)
			));
		}
		return articlesEntities;
	}

	async update(
		id: string, data: object
	): Promise<ArticleEntity | null> {
		await this.articleRepository.update(
			{ id: parseInt(id) },
			data
		);
		const article = await this.articleRepository.findOneBy({id: parseInt(id) });
		if (article) {
			const articleEntity = new ArticleEntity(
				article.id,
				article.title,
				article.content,
				article.created_at,
				article.updated_at,
				article.owner_id,
				article.comments.map(c => c.id)
			);
			return articleEntity;
		}
		return null;
	}

	async delete(id: string): Promise<boolean> {
		try {
			const result = await this.articleRepository.delete({ id: parseInt(id) });
			return result.affected !== undefined && result.affected > 0;
		} catch {
			return false;
		}
	}
}
