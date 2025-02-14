import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthDto } from 'src/application/auth/auth.dto/auth.dto';
import { AuthService } from 'src/application/auth/auth.service';

@Controller('auth')
export class AuthController {
	constructor(
private authService: AuthService, private jwtService: JwtService
	) {}

	@Post()
	@HttpCode(200)
	async login(
		@Body() authDto: AuthDto,
		@Res({ passthrough: true }) res: Response
	): Promise<boolean> {
		const result = await this.authService.login(authDto);
		if (!result)
			throw new HttpException(
				'Not found',
				HttpStatus.UNAUTHORIZED
			);
		const payload = { sub: result.id, nickname: result.nickname };
		res.cookie(
			'access_token',
			await this.jwtService.signAsync(payload),
			{ httpOnly: true }
		);
		return true;
	}
}
