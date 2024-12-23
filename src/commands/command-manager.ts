import type { World } from "@serenityjs/core";
import type { TerraSkyblock } from "..";

import * as IslandCommand from "./list/island-command";

export class CommandManager {
	public plugin: TerraSkyblock;

	constructor(plugin: TerraSkyblock) {
		this.plugin = plugin;
	}

	public registerCommand(world: World) {
		IslandCommand.register(this.plugin, world);
	}
}
