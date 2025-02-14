import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { OwnerModel } from '../owner.model/owner.model';
import { CommentModel } from '../comment.model/comment.model';

@Entity('users')
export class UserModel {
  	@PrimaryGeneratedColumn()
  	id: number;

	@Column({
		type: 'varchar',
		length: 40,
		nullable: false,
		unique: true,
	})
  	nickname: string;

	@Column({
		type: 'varchar',
		length: 50,
		nullable: false,
		unique: true,
	})
  	mail: string;

	@Column({
		type: 'varchar',
		length: 250,
		nullable: false,
	})
  	password: string;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
  	created_at: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
  	updated_at: Date;

	@OneToOne(
		() => OwnerModel,
		(owner) => owner.user,
		{
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		}
	)
  	owner: OwnerModel;

	@OneToMany(
		() => CommentModel,
		(comment) => comment.user,
		{
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			eager: true
		}
	)
  	comments: CommentModel[];
}
