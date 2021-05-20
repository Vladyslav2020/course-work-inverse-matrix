import SquareMatrix from "./SquareMatrixClass.js";
import IdentityMatrix from "./IdentityMatrixClass.js";
import ExtendedMatrix from "./ExtendedMatrixClass.js";

SquareMatrix.prototype.getInverseMatrix = function(){
    if (this.getDeterminant() === 0) {
        return null;
    }
    let extendedMatrix = new ExtendedMatrix(this);
    extendedMatrix.processMatrix();
    let matrix = new SquareMatrix(this._size);
    for (let i = 0; i <this._size; i++) {
        for (let j =this._size; j < 2 * this._size; j++) {
            matrix.setElementAt(j - this._size, i, extendedMatrix.getElementAt(j, i));
        }
    }
    return matrix;
}

export default SquareMatrix;
