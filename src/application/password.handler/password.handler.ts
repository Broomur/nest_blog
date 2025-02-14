import * as argon2 from 'argon2';

export class PasswordHandler {

	static async hasher(password: string): Promise<string> {
		return await argon2.hash(
			password,
			{ type: argon2.argon2id }
		);
	}

	static async verify(
		userPassword: string, password: string
	): Promise<boolean> {
		return await argon2.verify(
			userPassword,
			password
		);
	}
}
