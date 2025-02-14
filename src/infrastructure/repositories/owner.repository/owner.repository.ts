import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerEntity } from '../../../domaine/entities/owner.entity/owner.entity';
import { OwnerRepositoryInterface } from '../../../domaine/interfaces/owner.repository.interface/owner.repository.interface';
import { OwnerModel } from '../../models/owner.model/owner.model';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerRepository implements OwnerRepositoryInterface {
	constructor(@InjectRepository(OwnerModel) private ownerRepository: Repository<OwnerModel>) {}

	async create(id: number): Promise<OwnerEntity> {
		const owner = this.ownerRepository.create({
			user_id: id
		});
		await this.ownerRepository.save(owner);
		const ownerEntity = new OwnerEntity(
			owner.id,
			owner.user_id,
			owner.created_at,
			owner.updated_at,
			(owner.articles ?? []).map(a => a.id)
		);
		return ownerEntity;
	}

	async getById(id: number): Promise<OwnerEntity | null> {
		const owner = await this.ownerRepository.findOneBy({ user_id: id });
		return new OwnerEntity(
			owner.id,
			owner.user_id,
			owner.created_at,
			owner.updated_at,
			(owner.articles ?? []).map(a => a.id)
		);
	}

	async getAll(): Promise<OwnerEntity[]> {
		const owners = await this.ownerRepository.find();
		const ownersEntities = [];
		for (const owner of owners)
			ownersEntities.push(new OwnerEntity(
				owner.id,
				owner.user_id,
				owner.created_at,
				owner.updated_at,
				(owner.articles ?? []).map(a => a.id)
			));
		return ownersEntities;
	}

	async isOwner(user_id: number): Promise<boolean> {
		return !!await this.ownerRepository.findOneBy({ user_id: user_id });
	}

	async delete(id: number): Promise<boolean> {
		const result = await this.ownerRepository.delete({ user_id: id });
		return result.affected !== undefined && result.affected > 0;
	}
}
