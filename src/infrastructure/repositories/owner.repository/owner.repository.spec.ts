import { DataSource, EntityManager } from 'typeorm';
import { OwnerRepository } from './owner.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModel } from '../../models/article.model/article.model';
import { OwnerModel } from '../../models/owner.model/owner.model';
import { UserModel } from '../../models/user.model/user.model';
import { CommentModel } from '../../models/comment.model/comment.model';
import { OwnerEntity } from '../../../domaine/entities/owner.entity/owner.entity';

describe(
	'OwnerRepository',
	() => {
		let manager: EntityManager;
		let ownerRepository: OwnerRepository;

		beforeAll(async () => {
			const module: TestingModule = await Test.createTestingModule({
				imports: [
					TypeOrmModule.forRoot(global.testDbConfig),
					TypeOrmModule.forFeature([ArticleModel, CommentModel, OwnerModel, UserModel])
				],
				providers: [
					OwnerRepository
				]
			}).compile();
			manager = module.get<DataSource>(getDataSourceToken()).manager;
			ownerRepository = module.get<OwnerRepository>(OwnerRepository);
		});

		beforeEach(async () => {
			await manager.query(`INSERT INTO users (nickname, mail, password) VALUES ('test_user', 'test@mail.io', 'test_password');`);
			await manager.query(`INSERT INTO owners (user_id) VALUES (1);`);
			await manager.query(`INSERT INTO users (nickname, mail, password) VALUES ('test2_user', 'test2@mail.io', 'test_password');`);
		});

		afterEach(async () => {
			const tables = await manager.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`);

			for (const table of tables)
				await manager.query(`TRUNCATE TABLE "${table.table_name}" RESTART IDENTITY CASCADE;`);
		});

		it(
			'should create owner',
			async () => {
				expect(await ownerRepository.create(2)).toBeInstanceOf(OwnerEntity);
			}
		);

		it(
			'should get by id',
			async () => {
				expect(await ownerRepository.getById(1)).toBeInstanceOf(OwnerEntity);
			}
		);

		it(
			'should get all',
			async () => {
				const owners = await ownerRepository.getAll();
				expect(owners).toBeInstanceOf(Array);
				expect(owners[0]).toBeInstanceOf(OwnerEntity);
			}
		);

		describe(
			'should verify if user is owner',
			() => {
				it(
					'user is owner',
					async () => {
						expect(await ownerRepository.isOwner(1)).toBeTruthy();
					}
				);

				it(
					'user is not owner',
					async () => {
						expect(await ownerRepository.isOwner(2)).toBeFalsy();
					}
				);
			}
		);

		it(
			'should delete',
			async () => {
				const result = await ownerRepository.delete(1);
				expect(result).toBeTruthy();
			}
		);
	}
);
