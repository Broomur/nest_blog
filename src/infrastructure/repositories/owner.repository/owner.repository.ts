import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerEntity } from 'src/domaine/entities/owner.entity/owner.entity';
import { OwnerRepositoryInterface } from 'src/domaine/interfaces/owner.repository.interface/owner.repository.interface';
import { OwnerModel } from 'src/infrastructure/models/owner.model/owner.model';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerRepository implements OwnerRepositoryInterface {
	constructor(@InjectRepository(OwnerModel) private ownerRepository: Repository<OwnerModel>) {}

	async create(id: string): Promise<OwnerEntity> {
		const owner = this.ownerRepository.create({
			id: Number(id)
		});
		await this.ownerRepository.save(owner);
		const ownerEntity = new OwnerEntity(
			owner.id,
			owner.created_at,
			owner.updated_at,
			owner.articles.map(a => a.id)
		);
		return ownerEntity;
	}

	async getById(id: string): Promise<OwnerEntity | null> {
		const owner = await this.ownerRepository.findOneBy({ id: Number(id) });
		return new OwnerEntity(
			owner.id,
			owner.created_at,
			owner.updated_at,
			owner.articles.map(a => a.id)
		);
	}

	async getAll(): Promise<OwnerEntity[]> {
		const owners = await this.ownerRepository.find();
		const ownersEntities = [];
		for (const owner of owners)
			ownersEntities.push(new OwnerEntity(
				owner.id,
				owner.created_at,
				owner.updated_at,
				owner.articles.map(a => a.id)
			));
		return ownersEntities;
	}

	async isOwner(user_id: string): Promise<boolean> {
		return !!await this.ownerRepository.findOneBy({ id: Number(user_id) });
	}

	async delete(id: string): Promise<boolean> {
		try {
			const result = await this.ownerRepository.delete({ id: Number(id) });
			return result.affected !== undefined && result.affected > 0;
		} catch {
			return false;
		}
	}
}
