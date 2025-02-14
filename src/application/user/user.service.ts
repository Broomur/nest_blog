import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY_INTERFACE, UserRepositoryInterface } from 'src/domaine/interfaces/user.repository.interface/user.repository.interface';
import { UserDto } from './user.dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { PasswordHandler } from './utils/password.handler/password.handler';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class UserService {
	constructor(@Inject(USER_REPOSITORY_INTERFACE) private userRepository: UserRepositoryInterface) {}

	async getAll(): Promise<UserDto[]> {
		const users = await this.userRepository.getAll();
		return plainToInstance(
			UserDto,
			users,
			{ excludeExtraneousValues: true }
		);
	}

	async create(userDto: UserDto): Promise<UserDto | false> {
		const hash = await PasswordHandler.hasher(userDto.password);
		try {
			const user = await this.userRepository.create(
				userDto.nickname,
				userDto.mail,
				hash
			);
			return plainToInstance(
				UserDto,
				user,
				{ excludeExtraneousValues: true }
			);
		} catch (e: any) {
			if (e instanceof QueryFailedError)
				return false;
		}
	}

	async delete(userId: number): Promise<boolean> {
		return await this.userRepository.delete(userId);
	}
}
