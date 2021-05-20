class Matrix {
    constructor(sizeX, sizeY){
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
    isValidCoords(x, y){
        return x < this.sizeCols && x >= 0 && y < this.sizeRows && y >= 0;
    }

    setElementAt(x, y, value) {
        if (this.isValidCoords(x, y))
            this.elements[y][x] = value;
    }
    get elements() {
        return this._elements;
    }
    getElementAt(x, y) {
        if (this.isValidCoords(x, y)) {
            return this._elements[y][x];
        }
        return -1;
    }
    swapRows(first, second) {
        [this._elements[first], this._elements[second]] = [this._elements[second], this._elements[first]];
    }
    multiplyRow(numberOfRow, K) {
        for (let i = 0; i < this.sizeCols; i++) {
            this._elements[numberOfRow][i] *= K;
        }
    }
    printMatrix() {
        console.log("Matrix = \n", this._elements);
    }
}

export default Matrix;
