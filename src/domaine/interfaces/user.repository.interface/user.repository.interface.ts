import { UserModel } from 'src/infrastructure/models/user.model/user.model';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface UserRepositoryInterface {
	create(nickname: string, mail: string, password: string): Promise<UserModel>;
	getById(id: string): Promise<UserModel | null>;
	getByMail(mail: string): Promise<UserModel | null>;
	getAll(): Promise<UserModel[]>;
	verifyPassword(user: UserModel, password: string): Promise<boolean>;
	update(id: string, data: QueryDeepPartialEntity<UserModel>): Promise<UserModel | null>;
	delete(id: string): Promise<boolean>;
}
