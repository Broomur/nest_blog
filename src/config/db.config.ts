import { registerAs } from '@nestjs/config';
import * as process from 'process';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig();

const config: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DATABASE_HOST,
	port: parseInt(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	entities: [`${__dirname}/../infrastructure/models/**.model/**.model.{js,ts}`],
	migrations: [`${__dirname}/../migrations/*.{ts,js}`],
	synchronize: false,
	ssl: process.env.NODE_ENV !== 'dev'
		? { rejectUnauthorized: false }
		: false,
};

export const databaseConfig = registerAs(
	'typeorm',
	() => config
);
export const connectionSource = new DataSource(config);