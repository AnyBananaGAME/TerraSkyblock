import Island from "./Island";
import { Vec3 } from "../peanuts";
import type { IslandData } from "./types";
import type { Player, Serenity } from "@serenityjs/core";
import type { TerraSkyblock } from "..";
import { IslandGenerator, IslandProvider, IslandWorker } from "../world";
import { DimensionType, Vector3f } from "@serenityjs/protocol";
import { Database } from "../database";

export class IslandManager {
	public static instance: IslandManager;
	public islands: Map<string, Island>;
	private plugin: TerraSkyblock;

	public constructor(plugin: TerraSkyblock) {
		this.islands = new Map();
		this.plugin = plugin;
		IslandManager.instance = this;
	}

	public create(name: string, owner: Player): Island {
		const data: IslandData = {
			name: name,
			spawn: new Vec3(8, 65, 8),
			members: [],
			owner: owner.username,
			permissions: [],
			settings: {
				pvp: false,
				locked: true,
				build: true,
				break: true,
				fly: true,
				chat: true,
			},
			level: 0,
		};
		const island = new Island(data);

		const provider = this.plugin.serenity.providers.get(IslandProvider);
		if (!provider) throw new Error("IslandProvider not found");
		const world = this.plugin.serenity.createWorld(IslandProvider, {
			identifier: `island-${name}`,
		});
		if (!world) throw new Error("World not found");
		const dimension = world.createDimension({
			identifier: "island",
			generator: IslandGenerator.identifier,
			spawnPosition: [data.spawn.x, data.spawn.y, data.spawn.z],
			type: DimensionType.Overworld,
			simulationDistance: 4,
		});
		if (!dimension) throw new Error("Dimension not found");
		this.islands.set(name, island);
		owner.teleport(new Vector3f(8, 65, 8), dimension);
		Database.getInstance().set(`island-${name}`, JSON.stringify(data));
		return island;
	}

	public async load(name: string): Promise<Island> {
		const data = await Database.getInstance().get(`island-${name}`);
		if (!data) throw new Error("Island not found");
		const islandData = JSON.parse(data as string) as IslandData;
		const island = new Island(islandData);
		this.islands.set(name, island);
		return island;
	}

	public getIslandByName(name: string): Island | undefined {
		return this.islands.get(name);
	}
}
