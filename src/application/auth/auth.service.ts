import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY_INTERFACE, UserRepositoryInterface } from 'src/domaine/interfaces/user.repository.interface/user.repository.interface';
import { AuthDto } from './auth.dto/auth.dto';
import { PasswordHandler } from '../password.handler/password.handler';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
	constructor(@Inject(USER_REPOSITORY_INTERFACE) private userRepository: UserRepositoryInterface) {}

	async login(authDto: AuthDto): Promise<AuthDto | false> {
		const user = await this.userRepository.getByMail(authDto.mail);
		const match = await PasswordHandler.verify(
			user.password,
			authDto.password
		);
		if (match)
			return plainToInstance(
				AuthDto,
				user,
				{ excludeExtraneousValues: true }
			);
		return false;
	}
}
