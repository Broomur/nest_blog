import { DataSource, EntityManager } from 'typeorm';
import { CommentRepository } from './comment.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModel } from '../../models/article.model/article.model';
import { CommentModel } from '../../models/comment.model/comment.model';
import { OwnerModel } from '../../models/owner.model/owner.model';
import { UserModel } from '../../models/user.model/user.model';
import { CommentEntity } from '../../../domaine/entities/comment.entity/comment.entity';

describe(
	'CommentRepository',
	() => {
		let manager: EntityManager;
		let commentRepository: CommentRepository;

		beforeAll(async () => {
			const module: TestingModule = await Test.createTestingModule({
				imports: [
					TypeOrmModule.forRoot(global.testDbConfig),
					TypeOrmModule.forFeature([ArticleModel, CommentModel, OwnerModel, UserModel])
				],
				providers: [
					CommentRepository
				]
			}).compile();
			manager = module.get<DataSource>(getDataSourceToken()).manager;
			commentRepository = module.get<CommentRepository>(CommentRepository);
		});

		beforeEach(async () => {
			await manager.query(`INSERT INTO users (nickname, mail, password) VALUES ('test_user', 'test@mail.io', 'test_password');`);
			await manager.query(`INSERT INTO owners (id) VALUES (1);`);
			await manager.query(`INSERT INTO articles (title, content, owner_id) VALUES ('test', 'test', 1)`);
			await manager.query(`INSERT INTO comments (content, user_id, article_id) VALUES ('test', 1, 1);`);
		});

		afterEach(async () => {
			const tables = await manager.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`);

			for (const table of tables)
				await manager.query(`TRUNCATE TABLE "${table.table_name}" RESTART IDENTITY CASCADE;`);
		});

		it(
			'should create comment',
			async () => {
				expect(await commentRepository.create(
					'test_content',
					1,
					1
				)).toBeInstanceOf(CommentEntity);
			}
		);

		it(
			'should get comment by id',
			async () => {
				expect(await commentRepository.getById(1)).toBeInstanceOf(CommentEntity);
			}
		);

		it(
			'should get all comments',
			async () => {
				const comments = await commentRepository.getAll();
				expect(comments).toBeInstanceOf(Array);
				expect(comments[0]).toBeInstanceOf(CommentEntity);
			}
		);

		it(
			'should get all comments by article',
			async () => {
				const comments = await commentRepository.getByArticle(1);
				expect(comments).toBeInstanceOf(Array);
				expect(comments[0]).toBeInstanceOf(CommentEntity);
			}
		);

		it(
			'should get all comments by user',
			async () => {
				const comments = await commentRepository.getByUser(1);
				expect(comments).toBeInstanceOf(Array);
				expect(comments[0]).toBeInstanceOf(CommentEntity);
			}
		);

		it(
			'should update',
			async () => {
				const comment = await commentRepository.update(
					1,
					{ content: 'test2' }
				);
				expect(comment).toBeInstanceOf(CommentEntity);
				expect(comment.content).toBe('test2');
			}
		);

		it(
			'should delete',
			async () => {
				expect(await commentRepository.delete(1)).toBeTruthy();
			}
		);
	}
);
