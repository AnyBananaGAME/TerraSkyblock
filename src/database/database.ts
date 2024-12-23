import fs from "node:fs";

export type DatabaseType = "json" | "redis" | "sqlite";

export class Database {
	public static instance: Database;
	public type!: DatabaseType;
	public path!: string;

	/**
	 * @param type - The type of database to create
	 * @param path - The path to the database file + name of it e.g `${process.cwd()}/database.json`
	 */
	constructor(type: DatabaseType, path?: string) {
		if (Database.instance) {
			return;
		}
		if (path) {
			this.path = path;
		}
		if (type === "json") {
			this.path = `${process.cwd()}/database.json`;
			console.log(this.path);
			if (!fs.existsSync(this.path)) {
				fs.writeFileSync(this.path, "{}");
			}
		} else if (type === "redis") {
			this.path = "redis://localhost:6379";
		} else if (type === "sqlite") {
			this.path = `${process.cwd()}/database.sqlite`;
		}
		this.type = type;
		Database.instance = this;
	}

	public static getInstance(): Database {
		if (!Database.instance) {
			Database.instance = new Database("sqlite");
		}
		return Database.instance;
	}

	public async get(key: string): Promise<unknown | null> {
		if (this.type === "json") {
			const json = fs.readFileSync(this.path, "utf8");
			return JSON.parse(json)[key] ?? null;
		}
		if (this.type === "redis") {
			return null;
		}
		if (this.type === "sqlite") {
			return null;
		}
		return null;
	}

	public async set(key: string, value: unknown): Promise<void> {
		if (this.type === "json") {
			const json = fs.readFileSync(this.path, "utf8");
			const data = JSON.parse(json);
			data[key] = value;
			fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
		}
	}

	public async has(key: string): Promise<boolean> {
		const value = await this.get(key);
		return value !== null;
	}

	public async delete(key: string): Promise<void> {
		if (this.type === "json") {
			const json = fs.readFileSync(this.path, "utf8");
			const data = JSON.parse(json);
			delete data[key];
			fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
		}
	}

	public async clear(): Promise<void> {
		if (this.type === "json") {
			fs.writeFileSync(this.path, "{}");
		}
	}

	public async close(): Promise<void> {
		if (this.type === "json") {
			fs.closeSync(fs.openSync(this.path, "w"));
		}
	}
}
