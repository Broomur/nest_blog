export class ArticleEntity {
	private readonly _id: number;
	private _title: string;
	private _content: string;
	private readonly _created_at: Date;
	private readonly _updated_at: Date | null;
	private readonly _owner_id: number;
	private _comments: number[];

	constructor(
		id: number,
		title: string,
		content: string,
		created_at: Date,
		updated_at: Date | null,
		owner_id: number,
		comments: number[]
	) {
		this._id = id;
		this.title = title;
		this.content = content;
		this._created_at = created_at;
		this._updated_at = updated_at;
		this._owner_id = owner_id;
		this.comments = comments;
	}

	get id(): number {
		return this._id;
	}

	get title(): string {
		return this._title;
	}

	set title(title: string) {
		if (title.length > 3 && title.length < 50)
			this._title = title;
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

	get owner_id(): number {
		return this._owner_id;
	}

	get comments(): number[] {
		return this._comments;
	}

	set comments(comments: number[]) {
		if (comments.length)
			this.comments.push(...comments);
	}
}
