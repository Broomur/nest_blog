import { ArticleModel } from 'src/infrastructure/models/article.model/article.model';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface ArticleRepositoryInterface {
	create(title: string, content: string, owner_id: string): Promise<ArticleModel>;
	getById(id: string): Promise<ArticleModel | null>;
	getAll(): Promise<ArticleModel[]>;
	getByOwner(owner_id: string): Promise<ArticleModel[]>;
	update(id: string, data: QueryDeepPartialEntity<ArticleModel>): Promise<ArticleModel | null>;
	delete(id: string): Promise<boolean>;
}
