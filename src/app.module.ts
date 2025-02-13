import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomaineModule } from './domaine/domaine.module';
import { ApplicationModule } from './application/application.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [
		InfrastructureModule,
		DomaineModule,
		ApplicationModule,
		PresentationModule,
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
