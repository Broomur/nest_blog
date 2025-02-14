import { Module } from '@nestjs/common';
import { ArticleController } from './article/article.controller';
import { ArticleService } from 'src/application/article/article.service';
import { UserModel } from 'src/infrastructure/models/user.model/user.model';
import { OwnerModel } from 'src/infrastructure/models/owner.model/owner.model';
import { CommentModel } from 'src/infrastructure/models/comment.model/comment.model';
import { ArticleModel } from 'src/infrastructure/models/article.model/article.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from 'src/application/application.module';
import { UserController } from './user/user.controller';
import { UserService } from 'src/application/user/user.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from 'src/application/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constant';

@Module({
	imports: [
		ApplicationModule,
		TypeOrmModule.forFeature([
			ArticleModel,
			CommentModel,
			OwnerModel,
			UserModel
		]),
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '30min' }
		})
	],
	controllers: [ArticleController, UserController, AuthController],
	providers: [
		AuthService,
		ArticleService,
		UserService
	]
})
export class PresentationModule {}
