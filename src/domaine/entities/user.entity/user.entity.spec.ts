import { UserEntity } from './user.entity';

describe(
	'UserEntity',
	() => {
		const userEntity = new UserEntity(
			1,
			'test',
			'test@mail.io',
			'test',
			new Date(),
			new Date(),
			[]
		);

		it(
			'should be defined',
			() => {
				expect(userEntity).toBeDefined();
			}
		);
	}
);
