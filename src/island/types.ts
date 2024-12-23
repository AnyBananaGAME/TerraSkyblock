import type { Vec3 } from "../peanuts";

export declare type IslandData = {
	name: string;
	spawn: Vec3;
	members: string[];
	owner: string;
	permissions: Array<[string, boolean]>;
	settings: {
		pvp: boolean;
		locked: boolean;
		build: boolean;
		break: boolean;
		fly: boolean;
		chat: boolean;
	};
	level: number;
};
