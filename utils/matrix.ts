export class Matrix<T = unknown> {
  private content: T[][];
  readonly height: number;
  readonly width: number;

  /**
   * Constructor
   */
  constructor(data: T[][]) {
    if (
      data.length === 0 ||
      data.some((row) => row.length !== data[0].length)
    ) {
      throw new Error("All rows must have the same width.");
    }

    this.content = data;
    this.height = data.length;
    this.width = data[0].length;
  }

  /**
   * Static method to create a matrix from an array of arrays
   */
  static fromArray<T>(arr: T[][]): Matrix<T> {
    return new Matrix(arr);
  }

  /**
   * Static method to create a matrix from dimensions
   */
  static fromDimensions<T>(
    height: number,
    width: number,
    defaultValue: T
  ): Matrix<T> {
    const arr: T[][] = [];
    for (let r = 0; r < height; r++) {
      const row: T[] = [];
      for (let c = 0; c < width; c++) {
        row.push(defaultValue);
      }
      arr.push(row);
    }
    return new Matrix(arr);
  }

  /**
   * Get the value at (y, x)
   */
  get(y: number, x: number): T {
    if (y < 0 || y >= this.height || x < 0 || x >= this.width) {
      return undefined!;
    }

    return this.content[y][x];
  }

  /**
   * Set the value at (y, x)
   */
  set(y: number, x: number, value: T): void {
    if (y < 0 || y >= this.height || x < 0 || x >= this.width) {
      throw new RangeError(`Coordinates (${y}, ${x}) are out of bounds.`);
    }
    this.content[y][x] = value;
  }

  get data() {
    return structuredClone(this.content);
  }

  /**
   * Make the matrix iterable
   */
  *[Symbol.iterator](): IterableIterator<[T, number, number]> {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        yield [this.content[y][x], y, x];
      }
    }
  }

  /**
   * Iterate over adjacent cells (including diagonals) of a point
   */
  *adjacents(y: number, x: number): IterableIterator<[T, number, number]> {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1], // top-left, top, top-right
      [0, -1],
      [0, 1], // left, right
      [1, -1],
      [1, 0],
      [1, 1], // bottom-left, bottom, bottom-right
    ];

    for (const [dy, dx] of directions) {
      const newY = y + dy;
      const newX = x + dx;

      if (newY >= 0 && newY < this.height && newX >= 0 && newX < this.width) {
        yield [this.content[newY][newX], newY, newX];
      }
    }
  }

  calculateEntropy(): number {
    const { width, height, content } = this;

    if (width === 0 || height === 0) return 0; // Empty matrix check

    const totalCells = height * width;
    // deno-lint-ignore no-explicit-any
    const frequency: any = {};

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const cell = content[row][col];
        frequency[cell] = (frequency[cell] || 0) + 1;
      }
    }

    let entropy = 0;
    for (const symbol in frequency) {
      const probability = frequency[symbol] / totalCells;
      entropy -= probability * Math.log2(probability);
    }

    return entropy;
  }

  toString() {
    return this.content.map((s) => s.join("")).join("\n");
  }
}
