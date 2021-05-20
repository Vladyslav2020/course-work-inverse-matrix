import Matrix from "./MatrixClass.js";
import IdentityMatrix from "./IdentityMatrixClass.js";

class ExtendedMatrix extends Matrix {
    constructor(matrix) {
        super(2 * matrix._size, matrix._size);
        this._size = matrix._size;
        let IMatrix = new IdentityMatrix(this._size);
        for (let i = 0; i < this._size; i++) {
            for (let j = 0; j < this._size; j++)
            this._elements[i][j] = matrix.getElementAt(j, i);
            for (let j = 0; j < this._size; j++)
            this._elements[i][j + this._size] = IMatrix.getElementAt(j, i);
        }
    }
    processMatrix() {
        for (let i = 0; i < this._size; i++) {
            if (this._elements[i][i] === 0) {
                for (let j = i + 1; j < this._size; j++) {
                    if (this._elements[j][i] !== 0) {
                        this.swapRows(i, j);
                    }
                }
            }
            this.multiplyRow(i, 1 / this._elements[i][i]);
            for (let j = 0; j < this._size; j++) {
                if (j !== i) {
                    let coefficient = this._elements[j][i];
                    for (let k = 0; k < 2 * this._size; k++) {
                        this._elements[j][k] -= coefficient * this._elements[i][k];
                    }
                }
            }
        }
    }
}

export default ExtendedMatrix;
