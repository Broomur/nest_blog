import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryInterface } from 'src/domaine/interfaces/user.repository.interface/user.repository.interface';
import { UserModel } from 'src/infrastructure/models/user.model/user.model';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
	constructor(@InjectRepository(UserModel) private userRepository: Repository<UserModel>) {}

	async create(
		nickname: string, mail: string, password: string
	): Promise<UserModel> {
		const user = this.userRepository.create({
			nickname: nickname,
			mail: mail,
			password: password
		});
		await this.userRepository.save(user);
		return user;
	}

	async getById(id: string): Promise<UserModel | null> {
		return await this.userRepository.findOneBy({ id: Number(id) });
	}

	async getByMail(mail: string): Promise<UserModel | null> {
		return await this.userRepository.findOneBy({ mail: mail });
	}

	async getAll(): Promise<UserModel[]> {
		return await this.userRepository.find();
	}

	async update(
		id: string, data: QueryDeepPartialEntity<UserModel>
	): Promise<UserModel | null> {
		await this.userRepository.update(
			{ id: Number(id) },
			data
		);
		return await this.userRepository.findOneBy({ id: Number(id) });
	}

	async delete(id: string): Promise<boolean> {
		try {
			const result = await this.userRepository.delete({ id: Number(id) });
			return result.affected !== undefined && result.affected > 0;
		} catch {
			return false;
		}
	}
}
