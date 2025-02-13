import { UserModel } from 'src/infrastructure/models/user.model/user.model';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface UserRepositoryInterface {
	create(nickname: string, mail: string, password: string): Promise<UserModel>;
	getById(id: string): Promise<UserModel | null>;
	getByMail(mail: string): Promise<UserModel | null>;
	getAll(): Promise<UserModel[]>;
	update(id: string, data: QueryDeepPartialEntity<UserModel>): Promise<UserModel | null>;
	delete(id: string): Promise<boolean>;
}

export const USER_REPOSITORY_INTERFACE = 'USER_REPOSITORY_INTERFACE';
