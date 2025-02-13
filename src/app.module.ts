import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { databaseConfig } from './config/db.config';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApplicationModule } from './application/application.module';
import { DomaineModule } from './domaine/domaine.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [appConfig]
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule.forRoot({ load: [databaseConfig] })],
			inject: [databaseConfig.KEY],
			useFactory: (dbConfig: typeof databaseConfig) => {
				Logger.debug(dbConfig);
				return {
					...dbConfig
				} as TypeOrmModuleOptions;
			}
		}),
		InfrastructureModule,
		ApplicationModule,
		DomaineModule,
		PresentationModule
	],
	controllers: [AppController],
	providers: [
		AppService,
	],
})
export class AppModule {}
