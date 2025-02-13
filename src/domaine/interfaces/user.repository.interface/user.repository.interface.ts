import { UserEntity } from 'src/domaine/entities/user.entity/user.entity';

export interface UserRepositoryInterface {
	create(nickname: string, mail: string, password: string): Promise<UserEntity>;
	getById(id: string): Promise<UserEntity | null>;
	getByMail(mail: string): Promise<UserEntity | null>;
	getAll(): Promise<UserEntity[]>;
	update(id: string, data: object): Promise<UserEntity | null>;
	delete(id: string): Promise<boolean>;
}

export const USER_REPOSITORY_INTERFACE = 'USER_REPOSITORY_INTERFACE';
