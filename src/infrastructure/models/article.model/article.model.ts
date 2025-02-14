import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { OwnerModel } from '../owner.model/owner.model';
import { CommentModel } from '../comment.model/comment.model';

@Entity('articles')
export class ArticleModel {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({
		type: 'varchar',
		length: 50,
	})
		title: string;

	@Column({
		type: 'text',
	})
		content: string;

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

	@Column({
		type: 'int',
		nullable: true,
	})
		owner_id: number;

	@ManyToOne(
		() => OwnerModel,
		(owner) => owner.articles,
		{
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		}
	)
	@JoinColumn({
		name: 'owner_id',
	})
		owner: OwnerModel;

	@OneToMany(
		() => CommentModel,
		(comment) => comment.article,
		{
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			eager: true,
		}
	)
		comments: CommentModel[];
}
