import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryInterface } from 'src/domaine/interfaces/user.repository.interface/user.repository.interface';
import { UserModel } from 'src/infrastructure/models/user.model/user.model';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
	constructor(@InjectRepository(UserModel) private userRepository: Repository<UserModel>) {}

	async create(
		nickname: string, mail: string, password: string
	): Promise<UserModel> {
		const hash = await argon2.hash(
			password,
			{ type: argon2.argon2id }
		);
		const user = this.userRepository.create({
			nickname: nickname,
			mail: mail,
			password: hash
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

	async verifyPassword(
		user: UserModel, password: string
	): Promise<boolean> {
		return await argon2.verify(
			user.password,
			password
		);
	}

	async update(
		id: string, data: QueryDeepPartialEntity<UserModel>
	): Promise<UserModel | null> {
		if (data.password && typeof(data.password) === 'string')
			data.password = await argon2.hash(
				data.password,
				{ type: argon2.argon2id }
			);
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
