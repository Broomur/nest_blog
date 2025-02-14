import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { UserDto } from 'src/application/user/user.dto/user.dto';
import { UserService } from 'src/application/user/user.service';

@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	@HttpCode(200)
	async getAll(): Promise<UserDto[]> {
		return this.userService.getAll();
	}

	@Post()
	@HttpCode(201)
	async create(@Body() userDto: UserDto): Promise<UserDto> {
		const result = await this.userService.create(userDto);
		if (!result)
			throw new HttpException(
				'Already exists',
				HttpStatus.CONFLICT
			);
		return result;
	}

	@Delete()
	@HttpCode(204)
	async delete(@Query('id') id: number): Promise<boolean> {
		const result = await this.userService.delete(id);
		if (!result)
			throw new HttpException(
				'Not found',
				HttpStatus.NOT_FOUND
			);
		return result;
	}
}
