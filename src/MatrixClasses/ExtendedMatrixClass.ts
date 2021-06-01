import Matrix from "./MatrixClass";
import IdentityMatrix from "./IdentityMatrixClass";
import SquareMatrix from "./SquareMatrixClass";

class ExtendedMatrix extends Matrix {
    private readonly _size: number;
    constructor (size: number);
    constructor (matrix: SquareMatrix);
    constructor(data: SquareMatrix | number) {
        if (typeof data === 'number'){
            super(2 * data, data);
            this._size = data;
        }
        else{
            super(2 * data.size, data.size);
            this._size = data.size;
            let IMatrix = new IdentityMatrix(this._size);
            for (let i = 0; i < this._size; i++) {
                for (let j = 0; j < this._size; j++)
                    this._elements[i][j] = data.getElementAt(j, i);
                for (let j = 0; j < this._size; j++)
                    this._elements[i][j + this._size] = IMatrix.getElementAt(j, i);
            }
        }
    }
    get size(){
        return this._size;
    }
    processMatrix(): {numberOperations: number, matrices: Array<ExtendedMatrix>} {
        let numberElementaryOperations = 0;
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
            numberElementaryOperations += 2 * this._size;
            for (let j = 0; j < this._size; j++) {
                if (j !== i) {
                    let coefficient = this._elements[j][i];
                    for (let k = 0; k < 2 * this._size; k++) {
                        this._elements[j][k] -= coefficient * this._elements[i][k];
                        numberElementaryOperations++;
                    }
                }
            }
            matrices.push(Matrix.getCopyOfMatrix<ExtendedMatrix>(this, ExtendedMatrix));
        }
        return {
            numberOperations: numberElementaryOperations,
            matrices
        };
    }
}

export default ExtendedMatrix;
