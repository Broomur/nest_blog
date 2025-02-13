import { OwnerModel } from 'src/infrastructure/models/owner.model/owner.model';

export interface OwnerRepositoryInterface {
	create(id: string): Promise<OwnerModel>;
	getById(id: string): Promise<OwnerModel | null>;
	getAll(): Promise<OwnerModel[]>;
	isOwner(user_id: string): Promise<boolean>;
	delete(id: string): Promise<boolean>;
}
