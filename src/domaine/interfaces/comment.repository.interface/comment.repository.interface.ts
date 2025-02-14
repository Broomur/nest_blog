import { CommentEntity } from 'src/domaine/entities/comment.entity/comment.entity';

export interface CommentRepositoryInterface {
	create(content: string, user_id: number, article_id: number): Promise<CommentEntity>;
	getById(id: number): Promise<CommentEntity | null>;
	getAll(): Promise<CommentEntity[]>;
	getByArticle(article_id: number): Promise<CommentEntity[]>;
	getByUser(user_id: number): Promise<CommentEntity[]>;
	update(id: number, data: object): Promise<CommentEntity | null>;
	delete(id: number): Promise<boolean>;
}

export const COMMENT_REPOSITORY_INTERFACE = 'COMMENT_REPOSITORY_INTERFACE';