import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configs = app.get<ConfigService>(ConfigService);
	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),);
	await app.listen(configs.get('app.port'));
}
bootstrap();
