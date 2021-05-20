import Matrix from "./MatrixClass";
import IdentityMatrix from "./IdentityMatrixClass";
import SquareMatrix from "./SquareMatrixClass";

class ExtendedMatrix extends Matrix {
    private readonly _size: number;
    constructor(matrix: SquareMatrix) {
        super(2 * matrix.size, matrix.size);
        this._size = matrix.size;
        let IMatrix = new IdentityMatrix(this._size);
        for (let i = 0; i < this._size; i++) {
            for (let j = 0; j < this._size; j++)
            this._elements[i][j] = matrix.getElementAt(j, i);
            for (let j = 0; j < this._size; j++)
            this._elements[i][j + this._size] = IMatrix.getElementAt(j, i);
        }
    }
    get size(){
        return this._size;
    }
    processMatrix(): Array<ExtendedMatrix> {
        let matrices: Array<ExtendedMatrix> = [];
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
            let copyMatrix = new ExtendedMatrix(new IdentityMatrix(this._size));
            for (let i1 = 0; i1 < this._size; i1++)
                for (let j1 = 0; j1 < this._size * 2; j1++){
                    copyMatrix.setElementAt(j1, i1, this._elements[i1][j1]);
                }
            matrices.push(copyMatrix)
        }
        return matrices;
    }
}

export default ExtendedMatrix;
