import { CommentModel } from 'src/infrastructure/models/comment.model/comment.model';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface CommentRepositoryInterface {
	create(content: string, user_id: string, article_id: string): Promise<CommentModel>;
	getById(id: string): Promise<CommentModel | null>;
	getAll(): Promise<CommentModel[]>;
	getByArticle(article_id: string): Promise<CommentModel[]>;
	getByUser(user_id: string): Promise<CommentModel[]>;
	update(id: string, data: QueryDeepPartialEntity<CommentModel>): Promise<CommentModel | null>;
	delete(id: string): Promise<boolean>;
}

export const COMMENT_REPOSITORY_INTERFACE = 'COMMENT_REPOSITORY_INTERFACE';