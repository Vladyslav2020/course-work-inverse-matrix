class Matrix {
    private readonly sizeCols: number;
    private readonly sizeRows: number;
    protected _elements: Array<Array<number>>
    constructor(sizeX: number, sizeY: number){
        this.sizeCols = sizeX;
        this.sizeRows = sizeY;
        this._elements = [];
        for (let i = 0; i < sizeY; i++){
            this._elements.push([]);
            for (let j = 0; j < sizeX; j++){
                this._elements[i].push(0);
            }
        }
    }

    private isValidCoords(x: number, y: number){
        return x < this.sizeCols && x >= 0 && y < this.sizeRows && y >= 0;
    }

    setElementAt(x: number, y: number, value: number) {
        if (this.isValidCoords(x, y))
            this.elements[y][x] = value;
    }
    get elements() {
        return this._elements;
    }
    getElementAt(x: number, y: number) {
        if (this.isValidCoords(x, y)) {
            return this._elements[y][x];
        }
        return -1;
    }
    swapRows(first: number, second: number) {
        [this._elements[first], this._elements[second]] = [this._elements[second], this._elements[first]];
    }
    multiplyRow(numberOfRow: number, K: number) {
        for (let i = 0; i < this.sizeCols; i++) {
            this._elements[numberOfRow][i] *= K;
        }
    }
    printMatrix() {
        console.log("Matrix = \n", this._elements);
    }
}

export default Matrix;
