import { OwnerEntity } from 'src/domaine/entities/owner.entity/owner.entity';

export interface OwnerRepositoryInterface {
	create(id: number): Promise<OwnerEntity>;
	getById(id: number): Promise<OwnerEntity | null>;
	getAll(): Promise<OwnerEntity[]>;
	isOwner(user_id: number): Promise<boolean>;
	delete(id: number): Promise<boolean>;
}

export const OWNER_REPOSITORY_INTERFACE = 'OWNER_REPOSITORY_INTERFACE';