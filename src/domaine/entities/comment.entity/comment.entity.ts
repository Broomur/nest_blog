export class CommentEntity {
	private readonly _id: number;
	private _content: string;
	private readonly _created_at: Date;
	private readonly _updated_at: Date | null;
	private readonly _user_id: number;
	private readonly _article_id: number;

	constructor(
		id: number,
		content: string,
		created_at: Date,
		updated_at: Date | null,
		user_id: number,
		article_id: number
	) {
		this._id = id;
		this.content = content;
		this._created_at = created_at;
		this._updated_at = updated_at;
		this._user_id = user_id;
		this._article_id = article_id;
	}

	get id(): number {
		return this._id;
	}

	get content(): string {
		return this._content;
	}

	set content(content: string) {
		this._content = content;
	}

	get created_at(): Date {
		return this._created_at;
	}

	get updated_at(): Date | null {
		return this._updated_at;
	}

	get user_id(): number {
		return this._user_id;
	}

	get article_id(): number {
		return this._article_id;
	}
}
