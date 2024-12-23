class Vec3 {
	public x: number;
	public y: number;
	public z: number;

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public static from(x: number, y: number, z: number): Vec3 {
		return new Vec3(x, y, z);
	}

	public static fromString(str: string): Vec3 {
		const [x, y, z] = str.split(",").map(Number);
		if (x === undefined || y === undefined || z === undefined) {
			throw new Error("Invalid string format");
		}
		return new Vec3(x, y, z);
	}

	public static fromArray(arr: number[]): Vec3 {
		if (arr[0] === undefined || arr[1] === undefined || arr[2] === undefined) {
			throw new Error("Array must contain at least 3 elements");
		}
		return new Vec3(arr[0], arr[1], arr[2]);
	}

	public static fromObject(obj: { x: number; y: number; z: number }): Vec3 {
		return new Vec3(obj.x, obj.y, obj.z);
	}

	public add(vec: Vec3): Vec3 {
		return new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
	}

	public subtract(vec: Vec3): Vec3 {
		return new Vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
	}

	public multiply(vec: Vec3): Vec3 {
		return new Vec3(this.x * vec.x, this.y * vec.y, this.z * vec.z);
	}

	public divide(vec: Vec3): Vec3 {
		return new Vec3(this.x / vec.x, this.y / vec.y, this.z / vec.z);
	}

	public floor(): Vec3 {
		return new Vec3(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
	}

	public ceil(): Vec3 {
		return new Vec3(Math.ceil(this.x), Math.ceil(this.y), Math.ceil(this.z));
	}

	public round(): Vec3 {
		return new Vec3(Math.round(this.x), Math.round(this.y), Math.round(this.z));
	}

	public abs(): Vec3 {
		return new Vec3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
	}

	public clone(): Vec3 {
		return new Vec3(this.x, this.y, this.z);
	}
}

export { Vec3 };
