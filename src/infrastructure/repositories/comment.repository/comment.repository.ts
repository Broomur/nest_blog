import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepositoryInterface } from 'src/domaine/interfaces/comment.repository.interface/comment.repository.interface';
import { CommentModel } from 'src/infrastructure/models/comment.model/comment.model';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class CommentRepository implements CommentRepositoryInterface {
	constructor(@InjectRepository(CommentModel) private commentRepository: Repository<CommentModel>) {}

	async create(
		content: string, user_id: string, article_id: string
	): Promise<CommentModel> {
		const comment = this.commentRepository.create({
			content: content,
			user_id: Number(user_id),
			article_id: Number(article_id)
		});
		await this.commentRepository.save(comment);
		return comment;
	}

	async getById(id: string): Promise<CommentModel | null> {
		return await this.commentRepository.findOneBy({ id: Number(id) });
	}

	async getAll(): Promise<CommentModel[]> {
		return await this.commentRepository.find();
	}

	async getByArticle(article_id: string): Promise<CommentModel[]> {
		return await this.commentRepository.findBy({
			article_id: Number(article_id)
		});
	}

	async getByUser(user_id: string): Promise<CommentModel[]> {
		return await this.commentRepository.findBy({
			user_id: Number(user_id)
		});
	}

	async update(
		id: string, data: QueryDeepPartialEntity<CommentModel>
	): Promise<CommentModel | null> {
		await this.commentRepository.update(
			{ id: Number(id) },
			data
		);
		return await this.commentRepository.findOneBy({ id: Number(id) });
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
