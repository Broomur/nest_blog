import { Module } from '@nestjs/common';
import { ARTICLE_REPOSITORY_INTERFACE } from './interfaces/article.repository.interface/article.repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModel } from 'src/infrastructure/models/article.model/article.model';
import { CommentModel } from 'src/infrastructure/models/comment.model/comment.model';
import { OwnerModel } from 'src/infrastructure/models/owner.model/owner.model';
import { UserModel } from 'src/infrastructure/models/user.model/user.model';
import { ArticleRepository } from 'src/infrastructure/repositories/article.repository/article.repository';
import { OWNER_REPOSITORY_INTERFACE } from './interfaces/owner.repository.interface/owner.repository.interface';
import { OwnerRepository } from 'src/infrastructure/repositories/owner.repository/owner.repository';
import { COMMENT_REPOSITORY_INTERFACE } from './interfaces/comment.repository.interface/comment.repository.interface';
import { CommentRepository } from 'src/infrastructure/repositories/comment.repository/comment.repository';
import { USER_REPOSITORY_INTERFACE } from './interfaces/user.repository.interface/user.repository.interface';
import { UserRepository } from 'src/infrastructure/repositories/user.repository/user.repository';

@Module({
	imports: [TypeOrmModule.forFeature([ArticleModel, CommentModel, OwnerModel, UserModel])],
	providers: [
		{
			provide: ARTICLE_REPOSITORY_INTERFACE,
			useClass: ArticleRepository
		},
		{
			provide: COMMENT_REPOSITORY_INTERFACE,
			useClass: CommentRepository
		},
		{
			provide: OWNER_REPOSITORY_INTERFACE,
			useClass: OwnerRepository
		},
		{
			provide: USER_REPOSITORY_INTERFACE,
			useClass: UserRepository
		}
	]
})
export class DomaineModule {}
