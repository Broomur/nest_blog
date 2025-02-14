import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ArticleModel } from '../article.model/article.model';
import { UserModel } from '../user.model/user.model';

@Entity('owners')
export class OwnerModel {
	@PrimaryGeneratedColumn()
  	id: number;

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

	@OneToMany(
		() => ArticleModel,
		(article) => article.owner,
		{
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			eager: true
		}
	)
  	articles: ArticleModel[];

	@Column({
		type: 'int',
		nullable: false
	})
		user_id: number;

	@OneToOne(
		() => UserModel,
		(user) => user.owner,
		{
  			onDelete: 'CASCADE',
  			onUpdate: 'CASCADE',
  		}
  	)
  	@JoinColumn({
  		name: 'user_id',
  	})
  	user: UserModel;
}
