import { Module } from '@nestjs/common';
import { ArticleService } from './article/article.service';
import { ARTICLE_REPOSITORY_INTERFACE } from 'src/domaine/interfaces/article.repository.interface/article.repository.interface';
import { ArticleRepository } from 'src/infrastructure/repositories/article.repository/article.repository';
import { COMMENT_REPOSITORY_INTERFACE } from 'src/domaine/interfaces/comment.repository.interface/comment.repository.interface';
import { CommentRepository } from 'src/infrastructure/repositories/comment.repository/comment.repository';
import { OWNER_REPOSITORY_INTERFACE } from 'src/domaine/interfaces/owner.repository.interface/owner.repository.interface';
import { OwnerRepository } from 'src/infrastructure/repositories/owner.repository/owner.repository';
import { USER_REPOSITORY_INTERFACE } from 'src/domaine/interfaces/user.repository.interface/user.repository.interface';
import { UserRepository } from 'src/infrastructure/repositories/user.repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModel } from 'src/infrastructure/models/article.model/article.model';
import { CommentModel } from 'src/infrastructure/models/comment.model/comment.model';
import { OwnerModel } from 'src/infrastructure/models/owner.model/owner.model';
import { UserModel } from 'src/infrastructure/models/user.model/user.model';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ArticleModel,
			CommentModel,
			OwnerModel,
			UserModel
		])
	],
  	providers: [
		ArticleService,
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
		},
		UserService,
		AuthService
	],
	exports: [
		ARTICLE_REPOSITORY_INTERFACE,
		COMMENT_REPOSITORY_INTERFACE,
		OWNER_REPOSITORY_INTERFACE,
		USER_REPOSITORY_INTERFACE
	]
})
export class ApplicationModule {}
