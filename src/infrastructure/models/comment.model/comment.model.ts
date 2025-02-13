import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ArticleModel } from '../article.model/article.model';
import { UserModel } from '../user.model/user.model';

@Entity('comments')
export class CommentModel {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({
		type: 'text',
		nullable: false,
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
		user_id: number;

	@ManyToOne(
		() => UserModel,
		(user) => user.comments,
		{
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		}
	)
	@JoinColumn({
		name: 'user_id',
	})
		user: UserModel;

	@Column({
		type: 'int',
		nullable: true,
	})
		article_id: number;

	@ManyToOne(
		() => ArticleModel,
		(article) => article.comments,
		{
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		}
	)
	@JoinColumn({
		name: 'article_id',
	})
		article: ArticleModel;
}
