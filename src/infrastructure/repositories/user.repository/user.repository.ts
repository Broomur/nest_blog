import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/domaine/entities/user.entity/user.entity';
import { UserRepositoryInterface } from 'src/domaine/interfaces/user.repository.interface/user.repository.interface';
import { UserModel } from 'src/infrastructure/models/user.model/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
	constructor(@InjectRepository(UserModel) private userRepository: Repository<UserModel>) {}

	async create(
		nickname: string, mail: string, password: string
	): Promise<UserEntity> {
		const user = this.userRepository.create({
			nickname: nickname,
			mail: mail,
			password: password
		});
		await this.userRepository.save(user);
		return new UserEntity(
			user.id,
			user.nickname,
			user.mail,
			user.password,
			user.created_at,
			user.updated_at,
			user.comments.map(c => c.id)
		);
	}

	async getById(id: string): Promise<UserEntity | null> {
		const user = await this.userRepository.findOneBy({ id: Number(id) });
		if (user)
			return new UserEntity(
				user.id,
				user.nickname,
				user.mail,
				user.password,
				user.created_at,
				user.updated_at,
				user.comments.map(c => c.id)
			);
		return null;
	}

	async getByMail(mail: string): Promise<UserEntity | null> {
		const user = await this.userRepository.findOneBy({ mail: mail });
		if (user)
			return new UserEntity(
				user.id,
				user.nickname,
				user.mail,
				user.password,
				user.created_at,
				user.updated_at,
				user.comments.map(c => c.id)
			);
		return null;
	}

	async getAll(): Promise<UserEntity[]> {
		const users = await this.userRepository.find();
		const usersEntities = [];
		for (const user of users)
			usersEntities.push(new UserEntity(
				user.id,
				user.nickname,
				user.mail,
				user.password,
				user.created_at,
				user.updated_at,
				user.comments.map(c => c.id)
			));
		return usersEntities;
	}

	async update(
		id: string, data: object
	): Promise<UserEntity | null> {
		await this.userRepository.update(
			{ id: Number(id) },
			data
		);
		const user = await this.userRepository.findOneBy({ id: Number(id) });
		return new UserEntity(
			user.id,
			user.nickname,
			user.mail,
			user.password,
			user.created_at,
			user.updated_at,
			user.comments.map(c => c.id)
		);
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
