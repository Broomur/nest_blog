import { OwnerEntity } from './owner.entity';

describe(
	'OwnerEntity',
	() => {
		const ownerEntity = new OwnerEntity(
			1,
			1,
			new Date(),
			new Date(),
			[]
		);

		it(
			'should be defined',
			() => {
				expect(ownerEntity).toBeDefined();
			}
		);
	}
);
