import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
	@Expose()
	@IsNumber()
	@IsOptional()
		id: number;

	@Expose()
	@IsString()
	@IsOptional()
	@MaxLength(40)
	@MinLength(3)
		nickname: string;

	@Expose()
	@IsEmail()
		mail: string;

	@IsString()
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minNumbers: 1,
		minSymbols: 1,
		minUppercase: 1
	})
		password: string;
}
