export class OwnerEntity {
	private readonly _id: number;
	private readonly _created_at: Date;
	private readonly _updated_at: Date | null;
	private _articles: number[];

	constructor(
		id: number,
		created_at: Date,
		updated_at: Date | null,
		articles: number[]
	) {
		this._id = id;
		this._created_at = created_at;
		this._updated_at = updated_at;
		this._articles = articles;
	}

	get id(): number {
		return this._id;
	}

	get created_at(): Date {
		return this._created_at;
	}

	get updated_at(): Date | null {
		return this._updated_at;
	}

	get articles(): number[] {
		return this._articles;
	}

	set articles(articles: number[]) {
		this._articles.push(...articles);
	}
}
