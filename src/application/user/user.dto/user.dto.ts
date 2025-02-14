import { Expose, Type } from 'class-transformer';
import { IsArray, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { Match } from '../decorators/match.decorator';

export class UserDto {
	@Expose()
	@IsNumber()
	@IsNotEmpty()
	@IsOptional()
		id: number;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@MaxLength(40)
	@MinLength(3)
		nickname: string;

	@IsNotEmpty()
	@IsEmail()
		mail: string;

	@IsString()
	@IsNotEmpty()
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minNumbers: 1,
		minSymbols: 1,
		minUppercase: 1
	})
		password: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@Match('password')
		password_verify: string;


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
	@IsArray()
	@IsOptional()
		comments: number[];
}
