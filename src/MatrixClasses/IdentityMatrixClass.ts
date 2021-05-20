import SquareMatrix from "./SquareMatrixClass";

class IdentityMatrix extends SquareMatrix{
    constructor(size: number) {
        super(size);
        for (let i = 0; i < size; i++) {
            this._elements[i][i] = 1.0;
        }
    }
}

export default IdentityMatrix;
