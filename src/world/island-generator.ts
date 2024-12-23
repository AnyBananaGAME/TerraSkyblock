import { DimensionType } from "@serenityjs/protocol";
import { Chunk, TerrainGenerator } from "@serenityjs/core";

export class IslandGenerator extends TerrainGenerator {
	public static readonly identifier = "island";

	public apply(cx: number, cz: number): Chunk {
		const chunk = new Chunk(cx, cz, DimensionType.Overworld);
		chunk.ready = false;
		this.handoff(chunk);
		return chunk;
	}
}
