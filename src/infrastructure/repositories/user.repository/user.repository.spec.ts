import { DataSource, EntityManager } from 'typeorm';
import { UserRepository } from './user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModel } from '../../models/article.model/article.model';
import { CommentModel } from '../../models/comment.model/comment.model';
import { OwnerModel } from '../../models/owner.model/owner.model';
import { UserModel } from '../../models/user.model/user.model';
import { UserEntity } from '../../../domaine/entities/user.entity/user.entity';

describe(
	'UserRepository',
	() => {
		let manager: EntityManager;
		let userRepository: UserRepository;

		beforeAll(async () => {
			const module: TestingModule = await Test.createTestingModule({
				imports: [
					TypeOrmModule.forRoot(global.testDbConfig),
					TypeOrmModule.forFeature([ArticleModel, CommentModel, OwnerModel, UserModel])
				],
				providers: [
					UserRepository
				]
			}).compile();
			manager = module.get<DataSource>(getDataSourceToken()).manager;
			userRepository = module.get<UserRepository>(UserRepository);
		});

		beforeEach(async () => {
			await manager.query(`INSERT INTO users (nickname, mail, password) VALUES ('test_user', 'test@mail.io', 'test_password');`);
		});

		afterEach(async () => {
			const tables = await manager.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`);

			for (const table of tables)
				await manager.query(`TRUNCATE TABLE "${table.table_name}" RESTART IDENTITY CASCADE;`);
		});

		it(
			'should create user',
			async () => {
				expect(await userRepository.create(
					'test2',
					'test2@mail.io',
					'test'
				)).toBeInstanceOf(UserEntity);
			}
		);

		it(
			'should get by id',
			async () => {
				expect(await userRepository.getById(1)).toBeInstanceOf(UserEntity);
			}
		);

		it(
			'should get by mail',
			async () => {
				expect(await userRepository.getByMail('test@mail.io')).toBeInstanceOf(UserEntity);
			}
		);

		it(
			'should get all',
			async () => {
				const users = await userRepository.getAll();
				expect(users).toBeInstanceOf(Array);
				expect(users[0]).toBeInstanceOf(UserEntity);
			}
		);

		it(
			'should update',
			async () => {
				const user = await userRepository.update(
					1,
					{ nickname: 'test3' }
				);
				expect(user).toBeInstanceOf(UserEntity);
				expect(user.nickname).toBe('test3');
			}
		);

		it(
			'should delete',
			async () => {
				expect(await userRepository.delete(1)).toBeTruthy();
			}
		);
	}
);
