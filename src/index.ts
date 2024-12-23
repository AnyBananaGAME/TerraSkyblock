import { Plugin, type PluginEvents } from "@serenityjs/plugins";
import { Database } from "./database";
import { IslandGenerator, IslandProvider } from "./world";
import { EntityType, type Player, WorldEvent } from "@serenityjs/core";
import type { IslandData } from "./island";
import Island from "./island/Island";
import { IslandManager } from "./island/island-manager";
import { CommandManager } from "./commands/command-manager";

class TerraSkyblock extends Plugin implements PluginEvents {
	public commandManager: CommandManager;

	constructor() {
		super("TerraSkyblock", "1.0.0");
		this.commandManager = new CommandManager(this);
	}

	public onInitialize(): void {
		this.logger.info("TerraSkyblock initialized!");
		new Database("json", `${process.cwd()}/database.json`);
		this.serenity.registerGenerator(IslandGenerator);
		new IslandManager(this);

		this.serenity.on(WorldEvent.WorldInitialize, ({ world }) => {
			this.commandManager.registerCommand(world);
		});
	}

	public onStartUp(): void {
		this.logger.info("TerraSkyblock started up!");
		Database.getInstance().set("lastStart", Date.now());

		this.serenity.on(WorldEvent.EntitySpawned, async (signal) => {
			if (!signal.entity.isPlayer()) return;

			const player = signal.entity as Player;
			if (!(await Database.getInstance().has(`hasIsland-${player.xuid}`)))
				return player.sendMessage(
					"§6<§a§lError§r§6> §r§7You are not in an island!",
				);
			const name = await Database.getInstance().get(`hasIsland-${player.xuid}`);
			const data = await Database.getInstance().get(`island-${name}`);
			const json = JSON.parse(data as string) as IslandData;
			const world = this.serenity.worlds.get(`island-${name}`);
			if (!world) return console.log("World not found!");
			const island = new Island(json);
			IslandManager.instance.islands.set(name as string, island);
			player.sendMessage(
				`§6<§a§lSuccess§r§6> §r§7You are in an island! Name: ${name}`,
			);
		});
	}

	public onShutDown(): void {
		this.logger.info("TerraSkyblock stopped!");
	}
}

export default new TerraSkyblock();
export * from "./island";
export * from "./peanuts";
export { TerraSkyblock };
