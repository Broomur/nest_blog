import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/domaine/entities/comment.entity/comment.entity';
import { CommentRepositoryInterface } from 'src/domaine/interfaces/comment.repository.interface/comment.repository.interface';
import { CommentModel } from 'src/infrastructure/models/comment.model/comment.model';
import { Repository } from 'typeorm';

@Injectable()
export class CommentRepository implements CommentRepositoryInterface {
	constructor(@InjectRepository(CommentModel) private commentRepository: Repository<CommentModel>) {}

	async create(
		content: string, user_id: string, article_id: string
	): Promise<CommentEntity> {
		const comment = this.commentRepository.create({
			content: content,
			user_id: Number(user_id),
			article_id: Number(article_id)
		});
		await this.commentRepository.save(comment);
		return new CommentEntity(
			comment.id,
			comment.content,
			comment.created_at,
			comment.updated_at,
			comment.user_id,
			comment.article_id
		);
	}

	async getById(id: string): Promise<CommentEntity | null> {
		const comment = await this.commentRepository.findOneBy({ id: Number(id) });
		return new CommentEntity(
			comment.id,
			comment.content,
			comment.created_at,
			comment.updated_at,
			comment.user_id,
			comment.article_id
		);
	}

	async getAll(): Promise<CommentEntity[]> {
		const comments = await this.commentRepository.find();
		const commentsEntities = [];
		for (const comment of comments)
			commentsEntities.push(new CommentEntity(
				comment.id,
				comment.content,
				comment.created_at,
				comment.updated_at,
				comment.user_id,
				comment.article_id
			));
		return commentsEntities;
	}

	async getByArticle(article_id: string): Promise<CommentEntity[]> {
		const comments = await this.commentRepository.findBy({
			article_id: Number(article_id)
		});
		const commentsEntities = [];
		for (const comment of comments)
			commentsEntities.push(new CommentEntity(
				comment.id,
				comment.content,
				comment.created_at,
				comment.updated_at,
				comment.user_id,
				comment.article_id
			));
		return commentsEntities;
	}

	async getByUser(user_id: string): Promise<CommentEntity[]> {
		const comments = await this.commentRepository.findBy({
			user_id: Number(user_id)
		});
		const commentsEntities = [];
		for (const comment of comments)
			commentsEntities.push(new CommentEntity(
				comment.id,
				comment.content,
				comment.created_at,
				comment.updated_at,
				comment.user_id,
				comment.article_id
			));
		return commentsEntities;
	}

	async update(
		id: string, data: object
	): Promise<CommentEntity | null> {
		await this.commentRepository.update(
			{ id: Number(id) },
			data
		);
		const comment = await this.commentRepository.findOneBy({ id: Number(id) });
		return new CommentEntity(
			comment.id,
			comment.content,
			comment.created_at,
			comment.updated_at,
			comment.user_id,
			comment.article_id
		);
	}

	async delete(id: string): Promise<boolean> {
		try {
			const result = await this.commentRepository.delete({ id: Number(id) });
			return result.affected !== undefined && result.affected > 0;
		} catch {
			return false;
		}
	}
}
