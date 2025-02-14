import { ArticleEntity } from 'src/domaine/entities/article.entity/article.entity';

export interface ArticleRepositoryInterface {
	create(title: string, content: string, owner_id: number): Promise<ArticleEntity>;
	getById(id: number): Promise<ArticleEntity | null>;
	getAll(): Promise<ArticleEntity[]>;
	getByOwner(owner_id: number): Promise<ArticleEntity[]>;
	update(id: number, data: object): Promise<ArticleEntity | null>;
	delete(id: number): Promise<boolean>;
}

export const ARTICLE_REPOSITORY_INTERFACE = 'ARTICLE_REPOSITORY_INTERFACE';