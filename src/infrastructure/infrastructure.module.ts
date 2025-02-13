import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModel } from './models/article.model/article.model';
import { CommentModel } from './models/comment.model/comment.model';
import { OwnerModel } from './models/owner.model/owner.model';
import { UserModel } from './models/user.model/user.model';
import { ArticleRepository } from './repositories/article.repository/article.repository';
import { CommentRepository } from './repositories/comment.repository/comment.repository';
import { OwnerRepository } from './repositories/owner.repository/owner.repository';
import { UserRepository } from './repositories/user.repository/user.repository';

@Module({
	imports: [TypeOrmModule.forFeature([ArticleModel, CommentModel, OwnerModel, UserModel])],
	providers: [
		ArticleRepository,
		CommentRepository,
		OwnerRepository,
		UserRepository,
	]
})
export class InfrastructureModule {}
