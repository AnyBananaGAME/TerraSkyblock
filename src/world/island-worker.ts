import {
	Chunk,
	TerrainWorker,
	Worker,
	BlockIdentifier,
	BlockPermutation,
} from "@serenityjs/core";
import { IslandGenerator } from "./island-generator";
import { type DimensionType, Vector3f } from "@serenityjs/protocol";

@Worker(IslandGenerator)
export class IslandWorker extends TerrainWorker {
	public static readonly path = __filename;
	private chunk: Chunk | null = null;

	public apply(cx: number, cz: number, type: DimensionType): Chunk {
		const chunk = new Chunk(cx, cz, type);
		this.chunk = chunk;
		const grass = BlockPermutation.resolve(BlockIdentifier.GrassBlock);
		const dirt = BlockPermutation.resolve(BlockIdentifier.Dirt);
		const pumpkin = BlockPermutation.resolve(BlockIdentifier.Pumpkin);
		const stone = BlockPermutation.resolve(BlockIdentifier.Stone);
		const bedrock = BlockPermutation.resolve(BlockIdentifier.Bedrock);
		const cobblestone = BlockPermutation.resolve(BlockIdentifier.Cobblestone);
		const iron_ore = BlockPermutation.resolve(BlockIdentifier.IronOre);
		const gold_ore = BlockPermutation.resolve(BlockIdentifier.GoldOre);
		const diamond_ore = BlockPermutation.resolve(BlockIdentifier.DiamondOre);
		const emerald_ore = BlockPermutation.resolve(BlockIdentifier.EmeraldOre);
		const lapis_ore = BlockPermutation.resolve(BlockIdentifier.LapisOre);
		const redstone_ore = BlockPermutation.resolve(BlockIdentifier.RedstoneOre);
		const coal_ore = BlockPermutation.resolve(BlockIdentifier.CoalOre);

		if (cx === 0 && cz === 0) {
			this.layer7(60, chunk, grass);
			this.layer7(59, chunk, dirt);
			this.layer5(58, chunk, [
				stone,
				cobblestone,
				stone,
				cobblestone,
				iron_ore,
				gold_ore,
				diamond_ore,
				emerald_ore,
				lapis_ore,
				redstone_ore,
				coal_ore,
			]);
			this.layer5(57, chunk, [
				stone,
				cobblestone,
				stone,
				cobblestone,
				iron_ore,
				gold_ore,
				diamond_ore,
				emerald_ore,
				lapis_ore,
				redstone_ore,
				coal_ore,
			]);
			this.layer3(56, chunk, [
				stone,
				cobblestone,
				stone,
				cobblestone,
				iron_ore,
				gold_ore,
				diamond_ore,
				emerald_ore,
				lapis_ore,
				redstone_ore,
				coal_ore,
			]);
			this.layer1(55, chunk, bedrock);

			chunk.setPermutation(new Vector3f(8, 61, 6), pumpkin, false);
			chunk.setPermutation(new Vector3f(6, 61, 6), pumpkin, false);
			chunk.setPermutation(new Vector3f(7, 61, 5), pumpkin, false);

			this.generateTree(7, 61, 6, chunk);
			this.chest(chunk);
			this.air(chunk);
		} else void this; // Just a funny thing.

		return chunk;
	}

	private chest(chunk: Chunk) {
		const chest = BlockPermutation.resolve(BlockIdentifier.Chest);
		chunk.setPermutation(new Vector3f(10, 61, 8), chest, false);
	}

	private air(chunk: Chunk) {
		const air_blocks = [
			new Vector3f(11, 60, 11),
			new Vector3f(11, 60, 5),
			new Vector3f(5, 60, 11),
			new Vector3f(5, 60, 5),
			new Vector3f(11, 59, 11),
			new Vector3f(11, 59, 5),
			new Vector3f(5, 59, 11),
			new Vector3f(5, 59, 5),
			new Vector3f(10, 57, 10),
			new Vector3f(6, 57, 10),
			new Vector3f(6, 57, 6),
			new Vector3f(10, 57, 6),
			new Vector3f(10, 59, 5),
			new Vector3f(11, 59, 6),
			new Vector3f(11, 59, 10),
			new Vector3f(10, 59, 11),
			new Vector3f(6, 59, 11),
			new Vector3f(5, 59, 10),
			new Vector3f(5, 59, 6),
			new Vector3f(6, 59, 5),
		] as Array<Vector3f>;
		for (const _block of air_blocks) {
			chunk.setPermutation(
				_block,
				BlockPermutation.resolve(BlockIdentifier.Air),
				false,
			);
		}
	}

	private layer7(y: number, chunk: Chunk, block: BlockPermutation): void {
		const blocks = [
			new Vector3f(5, y, 5),
			new Vector3f(5, y, 6),
			new Vector3f(5, y, 7),
			new Vector3f(5, y, 8),
			new Vector3f(5, y, 9),
			new Vector3f(5, y, 10),
			new Vector3f(5, y, 11),

			new Vector3f(6, y, 5),
			new Vector3f(6, y, 6),
			new Vector3f(6, y, 7),
			new Vector3f(6, y, 8),
			new Vector3f(6, y, 9),
			new Vector3f(6, y, 10),
			new Vector3f(6, y, 11),

			new Vector3f(7, y, 5),
			new Vector3f(7, y, 6),
			new Vector3f(7, y, 7),
			new Vector3f(7, y, 8),
			new Vector3f(7, y, 9),
			new Vector3f(7, y, 10),
			new Vector3f(7, y, 11),

			new Vector3f(8, y, 5),
			new Vector3f(8, y, 6),
			new Vector3f(8, y, 7),
			new Vector3f(8, y, 8),
			new Vector3f(8, y, 9),
			new Vector3f(8, y, 10),
			new Vector3f(8, y, 11),

			new Vector3f(9, y, 5),
			new Vector3f(9, y, 6),
			new Vector3f(9, y, 7),
			new Vector3f(9, y, 8),
			new Vector3f(9, y, 9),
			new Vector3f(9, y, 10),
			new Vector3f(9, y, 11),

			new Vector3f(10, y, 5),
			new Vector3f(10, y, 6),
			new Vector3f(10, y, 7),
			new Vector3f(10, y, 8),
			new Vector3f(10, y, 9),
			new Vector3f(10, y, 10),
			new Vector3f(10, y, 11),

			new Vector3f(11, y, 5),
			new Vector3f(11, y, 6),
			new Vector3f(11, y, 7),
			new Vector3f(11, y, 8),
			new Vector3f(11, y, 9),
			new Vector3f(11, y, 10),
			new Vector3f(11, y, 11),
		] as Array<Vector3f>;
		for (const _block of blocks) {
			chunk.setPermutation(_block, block, false);
		}
	}

	private layer5(y: number, chunk: Chunk, blocks: BlockPermutation[]): void {
		const _blocks = [
			new Vector3f(6, y, 6),
			new Vector3f(6, y, 7),
			new Vector3f(6, y, 8),
			new Vector3f(6, y, 9),
			new Vector3f(6, y, 10),

			new Vector3f(7, y, 6),
			new Vector3f(7, y, 7),
			new Vector3f(7, y, 8),
			new Vector3f(7, y, 9),
			new Vector3f(7, y, 10),

			new Vector3f(8, y, 6),
			new Vector3f(8, y, 7),
			new Vector3f(8, y, 8),
			new Vector3f(8, y, 9),
			new Vector3f(8, y, 10),

			new Vector3f(9, y, 6),
			new Vector3f(9, y, 7),
			new Vector3f(9, y, 8),
			new Vector3f(9, y, 9),
			new Vector3f(9, y, 10),

			new Vector3f(10, y, 6),
			new Vector3f(10, y, 7),
			new Vector3f(10, y, 8),
			new Vector3f(10, y, 9),
			new Vector3f(10, y, 10),
		];
		for (const _block of _blocks) {
			if (blocks.length === 0) throw new Error("No blocks to set");
			const randomBlock = blocks[Math.floor(Math.random() * blocks.length)];
			if (!randomBlock) throw new Error("Block Does not exist!"); // This should never happen?
			chunk.setPermutation(_block, randomBlock, false);
		}
	}

	private layer3(y: number, chunk: Chunk, blocks: BlockPermutation[]): void {
		const _blocks = [
			new Vector3f(7, y, 7),
			new Vector3f(7, y, 8),
			new Vector3f(7, y, 9),

			new Vector3f(8, y, 7),
			new Vector3f(8, y, 8),
			new Vector3f(8, y, 9),

			new Vector3f(9, y, 7),
			new Vector3f(9, y, 8),
			new Vector3f(9, y, 9),
		];
		for (const _block of _blocks) {
			if (blocks.length === 0) throw new Error("No blocks to set");
			const randomBlock = blocks[Math.floor(Math.random() * blocks.length)];
			if (!randomBlock) throw new Error("Block Does not exist!");
			chunk.setPermutation(_block, randomBlock, false);
		}
	}

	private layer1(y: number, chunk: Chunk, block: BlockPermutation): void {
		const blocks = [new Vector3f(8, y, 8)];
		for (const _block of blocks) {
			chunk.setPermutation(_block, block, false);
		}
	}

	private generateTree(x: number, y: number, z: number, chunk: Chunk): void {
		const treeHeight = 7;
		const OAK_LOG = BlockPermutation.resolve(BlockIdentifier.OakLog);
		const OAK_LEAVES = BlockPermutation.resolve(BlockIdentifier.OakLeaves);
		const DIRT = BlockPermutation.resolve(BlockIdentifier.Dirt);

		chunk.setPermutation({ x, y: y - 1, z }, DIRT, false);

		for (let yy = 0; yy < treeHeight - 1; yy++) {
			chunk.setPermutation({ x, y: y + yy, z }, OAK_LOG, false);
		}

		for (let yy = y - 3 + treeHeight; yy <= y + treeHeight; yy++) {
			const yOff = yy - (y + treeHeight);
			const mid = Math.floor(1 - yOff / 2);
			for (let xx = x - mid; xx <= x + mid; xx++) {
				const xOff = Math.abs(xx - x);
				for (let zz = z - mid; zz <= z + mid; zz++) {
					const zOff = Math.abs(zz - z);
					if (
						xOff === mid &&
						zOff === mid &&
						(yOff === 0 || Math.random() < 0.5)
					) {
						continue;
					}
					const blockPos = { x: xx, y: yy, z: zz };
					const currentBlock = chunk.getPermutation(blockPos);
					if (this.canOverride(currentBlock)) {
						chunk.setPermutation(blockPos, OAK_LEAVES, false);
					}
				}
			}
		}
	}

	private canOverride(block: BlockPermutation): boolean {
		return block.type.air;
	}
}
