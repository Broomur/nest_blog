import { Expose, Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class ArticleDto {
	@Expose()
	@IsNumber()
	@IsNotEmpty()
	@IsOptional()
		id: number;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	@MinLength(3)
		title: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
		content: string;

	@Expose()
	@IsDate()
	@IsOptional()
	@Type(() => Date)
		created_at: Date;

	@Expose()
	@IsDate()
	@IsOptional()
	@Type(() => Date)
		updated_at: Date;

	@Expose()
	@IsNumber()
	@IsNotEmpty()
		owner_id: number;

	@Expose()
	@IsArray()
	@IsOptional()
		comments: number[];
}
