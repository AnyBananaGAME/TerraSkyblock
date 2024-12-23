import { ActionForm, type Player } from "@serenityjs/core";
import type { TerraSkyblock } from "..";
import { Database } from "../database";
type FormResult<T> = (response: T | null, error: Error | null) => void;

export class IslandForm {
	public buttons: string[] = [];
	public form: ActionForm;
	public player: Player;
	public plugin: TerraSkyblock;

	constructor(player: Player, plugin: TerraSkyblock) {
		this.form = new ActionForm();
		this.player = player;
		this.plugin = plugin;
	}

	public async hasIsland(): Promise<boolean> {
		return await Database.getInstance().has(`hasIsland-${this.player.xuid}`);
	}

	public async setUp() {
		this.form.title = "Island Form";
		this.form.content = "Island Form";
		if (!(await this.hasIsland())) this.buttons.push("Create Island");
		if (await this.hasIsland()) this.buttons.push("Island Teleport");
		this.buttons.push("Island Information");
	}

	public async send() {
		await this.setUp();
		for (const button of this.buttons) {
			this.form.button(button);
		}
		console.log("Sending Form");

		this.form.show(this.player, (response, error) => {
			if (error) {
				this.player.sendMessage(`§6<§a§lError§r§6> §r${error.message}`);
				return;
			}
			this.player.sendMessage(
				`§6<§a§lSuccess§r§6> §rYou clicked ${this.buttons[response ?? 0]}`,
			);
			this.handleResponse(response);
		});
	}

	public async handleResponse(response: number | null) {
		if (response === null) return;

		switch (this.buttons[response]) {
			case "Create Island": {
				this.player.sendMessage("Creating Island...");
				break;
			}
		}
	}
}
