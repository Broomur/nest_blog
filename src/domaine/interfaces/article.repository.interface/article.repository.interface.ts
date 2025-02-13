import { ArticleEntity } from 'src/domaine/entities/article.entity/article.entity';

export interface ArticleRepositoryInterface {
	create(title: string, content: string, owner_id: string): Promise<ArticleEntity>;
	getById(id: string): Promise<ArticleEntity | null>;
	getAll(): Promise<ArticleEntity[]>;
	getByOwner(owner_id: string): Promise<ArticleEntity[]>;
	update(id: string, data: object): Promise<ArticleEntity | null>;
	delete(id: string): Promise<boolean>;
}

export const ARTICLE_REPOSITORY_INTERFACE = 'ARTICLE_REPOSITORY_INTERFACE';