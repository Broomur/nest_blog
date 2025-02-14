import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../../../domaine/entities/comment.entity/comment.entity';
import { CommentRepositoryInterface } from '../../../domaine/interfaces/comment.repository.interface/comment.repository.interface';
import { CommentModel } from '../../models/comment.model/comment.model';
import { Repository } from 'typeorm';

@Injectable()
export class CommentRepository implements CommentRepositoryInterface {
	constructor(@InjectRepository(CommentModel) private commentRepository: Repository<CommentModel>) {}

	async create(
		content: string, user_id: number, article_id: number
	): Promise<CommentEntity> {
		const comment = this.commentRepository.create({
			content: content,
			user_id: user_id,
			article_id: article_id
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

	async getById(id: number): Promise<CommentEntity | null> {
		const comment = await this.commentRepository.findOneBy({ id: id });
		if (comment)
			return new CommentEntity(
				comment.id,
				comment.content,
				comment.created_at,
				comment.updated_at,
				comment.user_id,
				comment.article_id
			);
		return null;
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

	async getByArticle(article_id: number): Promise<CommentEntity[]> {
		const comments = await this.commentRepository.findBy({
			article_id: article_id
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

	async getByUser(user_id: number): Promise<CommentEntity[]> {
		const comments = await this.commentRepository.findBy({
			user_id: user_id
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
		id: number, data: object
	): Promise<CommentEntity | null> {
		await this.commentRepository.update(
			{ id: id },
			data
		);
		const comment = await this.commentRepository.findOneBy({ id: id });
		return new CommentEntity(
			comment.id,
			comment.content,
			comment.created_at,
			comment.updated_at,
			comment.user_id,
			comment.article_id
		);
	}

	async delete(id: number): Promise<boolean> {
		const result = await this.commentRepository.delete({ id: id });
		return result.affected !== undefined && result.affected > 0;
	}
}
