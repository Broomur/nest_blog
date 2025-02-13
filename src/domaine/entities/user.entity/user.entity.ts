export class UserEntity {
	private readonly _id: number;
	private _nickname: string;
	private _mail: string;
	private _password: string;
	private readonly _created_at: Date;
	private readonly _updated_at: Date | null;
	private _comments: number[];

	constructor(
		id: number,
		nickname: string,
		mail: string,
		password: string,
		created_at: Date,
		updated_at: Date | null,
		comments: number[],
	) {
		this._id = id;
		this.nickname = nickname;
		this.mail = mail;
		this.password = password;
		this._created_at = created_at;
		this._updated_at = updated_at;
		this.comments = comments;
	}

	get id(): number {
		return this._id;
	}

	get nickname(): string {
		return this._nickname;
	}

	set nickname(nickname: string) {
		if (nickname.length > 3 && nickname.length < 40)
			this._nickname = nickname;
	}

	get mail(): string {
		return this._mail;
	}

	set mail(mail: string) {
		if (mail.includes('@'))
			this._mail = mail;
	}

	get password(): string {
		return this._password;
	}

	set password(password: string) {
		this._password = password;
	}

	get created_at(): Date {
		return this._created_at;
	}

	get updated_at(): Date | null {
		return this._updated_at;
	}

	get comments(): number[] {
		return this._comments;
	}

	set comments(comments: number[]) {
		this._comments.push(...comments);
	}
}
