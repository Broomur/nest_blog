import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { ArticleModel } from '../../models/article.model/article.model';
import { OwnerModel } from '../../models/owner.model/owner.model';
import { CommentModel } from '../../models/comment.model/comment.model';
import { UserModel } from '../../models/user.model/user.model';
import { DataSource, EntityManager } from 'typeorm';
import { ArticleEntity } from '../../../domaine/entities/article.entity/article.entity';

describe(
	'ArticleRepository',
	() => {
		let manager: EntityManager;
		let articleRepository: ArticleRepository;

		beforeAll(async () => {
			const module: TestingModule = await Test.createTestingModule({
				imports: [
					TypeOrmModule.forRoot(global.testDbConfig),
					TypeOrmModule.forFeature([ArticleModel, OwnerModel, CommentModel, UserModel])
				],
				providers: [
					ArticleRepository
				]
			}).compile();
			manager = module.get<DataSource>(getDataSourceToken()).manager;
			articleRepository = module.get<ArticleRepository>(ArticleRepository);
		});

		beforeEach(async () => {
			await manager.query(`INSERT INTO users (nickname, mail, password) VALUES ('test_user', 'test@mail.io', 'test_password');`);
			await manager.query(`INSERT INTO owners (id) VALUES (1);`);
		});

		afterEach(async () => {
			const tables = await manager.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\'');

			for (const table of tables) {
				await manager.query(`TRUNCATE TABLE "${table.table_name}" RESTART IDENTITY CASCADE;`);
			}
		});

		it(
			'should be defined',
			() => {
				expect(articleRepository).toBeDefined();
			}
		);

		it(
			'should create article',
			async () => {
				const title = 'test_title';
				const content = 'test_content';
				const owner_id = '1';
				expect(await articleRepository.create(
					title,
					content,
					owner_id
				)).toBeInstanceOf(ArticleEntity);
			}
		);
	}
);
