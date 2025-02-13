import { OwnerEntity } from 'src/domaine/entities/owner.entity/owner.entity';

export interface OwnerRepositoryInterface {
	create(id: string): Promise<OwnerEntity>;
	getById(id: string): Promise<OwnerEntity | null>;
	getAll(): Promise<OwnerEntity[]>;
	isOwner(user_id: string): Promise<boolean>;
	delete(id: string): Promise<boolean>;
}

export const OWNER_REPOSITORY_INTERFACE = 'OWNER_REPOSITORY_INTERFACE';