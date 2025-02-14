import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ArticleModel } from './infrastructure/models/article.model/article.model';
import { CommentModel } from './infrastructure/models/comment.model/comment.model';
import { OwnerModel } from './infrastructure/models/owner.model/owner.model';
import { UserModel } from './infrastructure/models/user.model/user.model';

export const testDbConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'test_user',
	password: 'test',
	database: 'test_db',
	entities: [ArticleModel, CommentModel, OwnerModel, UserModel],
	synchronize: true,
	migrationsRun: false,
	logging: false,
};

global.testDbConfig = testDbConfig;
