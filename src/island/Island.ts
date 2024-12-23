import { Database } from "../database";
import type { Vec3 } from "../peanuts";
import type { IslandData } from "./types";

export default class Island {
	private name: string;
	private spawn: Vec3;
	private members: string[];

	private owner: string;
	private permissions: Array<[string, boolean]>;
	private settings: {
		pvp: boolean;
		locked: boolean;
		build: boolean;
		break: boolean;
		fly: boolean;
		chat: boolean;
	};
	private level: number;

	constructor(data: IslandData) {
		this.name = data.name;
		this.spawn = data.spawn;
		this.owner = data.owner;
		this.members = data.members;
		this.permissions = data.permissions;
		this.settings = data.settings;
		this.level = data.level;
	}

	public getSpawn(): Vec3 {
		return this.spawn;
	}

	public getOwner(): string {
		return this.owner;
	}

	public getMembers(): string[] {
		return this.members;
	}

	public getPermissions(): Array<[string, boolean]> {
		return this.permissions;
	}

	public getSettings(): {
		pvp: boolean;
		locked: boolean;
		build: boolean;
		break: boolean;
		fly: boolean;
		chat: boolean;
	} {
		return this.settings;
	}

	public getLevel(): number {
		return this.level;
	}

	public save(): void {
		const data = JSON.stringify({
			name: this.name,
			owner: this.owner,
			members: this.members,
			permissions: this.permissions,
			settings: this.settings,
			spawn: this.spawn,
			level: this.level,
		});
		Database.getInstance().set(this.name, data);
	}
}
