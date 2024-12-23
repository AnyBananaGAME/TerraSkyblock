import {
	CustomEnum,
	StringEnum,
	type Player,
	type World,
} from "@serenityjs/core";
import type { TerraSkyblock } from "../..";
import { Database } from "../../database";
import { IslandForm } from "../../forms";
import { CommandPermissionLevel } from "@serenityjs/protocol";

class IslandEnum extends CustomEnum {
	public static readonly identifier = "island_enum";
	public static readonly options = ["create", "info", "go", "tp"];
}

export const register = (plugin: TerraSkyblock, world: World) => {
	world.commands.register(
		"island",
		"default island command",
		async (registry) => {
			registry.permissionLevel = CommandPermissionLevel.Normal;
			registry.overload(
				{
					command: [IslandEnum, true],
				},
				async (signal) => {
					const player = signal.origin as Player;
					if (!player.isPlayer()) return;
					const name =
						(await Database.getInstance().get(`hasIsland-${player.xuid}`)) ??
						"Unknown";

					const form = new IslandForm(player, plugin);
					form.send();

					player.sendMessage(
						`§6<§a§lSuccess§r§6> §r§7You are in an island! Name: ${name}`,
					);
					return { message: "" };
				},
			);
		},
		() => {},
	);
};
