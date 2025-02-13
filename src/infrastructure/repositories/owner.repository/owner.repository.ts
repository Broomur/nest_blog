import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerRepositoryInterface } from 'src/domaine/interfaces/owner.repository.interface/owner.repository.interface';
import { OwnerModel } from 'src/infrastructure/models/owner.model/owner.model';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerRepository implements OwnerRepositoryInterface {
	constructor(@InjectRepository(OwnerModel) private ownerRepository: Repository<OwnerModel>) {}

	async create(id: string): Promise<OwnerModel> {
		const owner = this.ownerRepository.create({
			id: Number(id)
		});
		await this.ownerRepository.save(owner);
		return owner;
	}

	async getById(id: string): Promise<OwnerModel | null> {
		return await this.ownerRepository.findOneBy({ id: Number(id) });
	}

	async getAll(): Promise<OwnerModel[]> {
		return this.ownerRepository.find();
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
