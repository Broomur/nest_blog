import { CommentEntity } from 'src/domaine/entities/comment.entity/comment.entity';

export interface CommentRepositoryInterface {
	create(content: string, user_id: string, article_id: string): Promise<CommentEntity>;
	getById(id: string): Promise<CommentEntity | null>;
	getAll(): Promise<CommentEntity[]>;
	getByArticle(article_id: string): Promise<CommentEntity[]>;
	getByUser(user_id: string): Promise<CommentEntity[]>;
	update(id: string, data: object): Promise<CommentEntity | null>;
	delete(id: string): Promise<boolean>;
}

export const COMMENT_REPOSITORY_INTERFACE = 'COMMENT_REPOSITORY_INTERFACE';