import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModel } from 'src/infrastructure/models/article.model/article.model';
import { CommentModel } from 'src/infrastructure/models/comment.model/comment.model';
import { OwnerModel } from 'src/infrastructure/models/owner.model/owner.model';
import { UserModel } from 'src/infrastructure/models/user.model/user.model';

@Module({
	imports: [TypeOrmModule.forFeature([ArticleModel, CommentModel, OwnerModel, UserModel])]
})
export class DomaineModule {}
