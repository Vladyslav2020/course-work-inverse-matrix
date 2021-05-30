import ExtendedMatrix from "./ExtendedMatrixClass";
import IdentityMatrix from "./IdentityMatrixClass";
import SquareMatrix from "./SquareMatrixClass";
import Matrix from "./MatrixClass";

interface ReturnType{
    numberOperations: number;
    intermediateMatrices: Array<ExtendedMatrix | SquareMatrix>;
    inverseMatrix: SquareMatrix | null;
}

class MatrixInverter{
    private readonly _matrix: SquareMatrix;
    constructor(matrix: SquareMatrix) {
        this._matrix = matrix;
    }
    getInverseMatrixGaussMethod(): ReturnType{
        if (this._matrix.getDeterminant() === 0) {
            return {
                numberOperations: 0,
                intermediateMatrices: [],
                inverseMatrix: null
            };
        }
        let extendedMatrix = new ExtendedMatrix(this._matrix);
        let matrices = [Matrix.getCopyOfMatrix(extendedMatrix, ExtendedMatrix)]
        let result = extendedMatrix.processMatrix();
        matrices = [...matrices, ...result.matrices];
        let matrix = new SquareMatrix(this._matrix.size);
        for (let i = 0; i < this._matrix.size; i++) {
            for (let j = this._matrix.size; j < 2 * this._matrix.size; j++) {
                matrix.setElementAt(j - this._matrix.size, i, extendedMatrix.getElementAt(j, i));
            }
        }
        return {
            numberOperations: result.numberOperations,
            intermediateMatrices: matrices,
            inverseMatrix: matrix
        };
    }
    getInverseMatrixSchultzMethod(eps: number): ReturnType
    {
        if (this._matrix.getDeterminant() === 0)
            return {
                numberOperations: 0,
                inverseMatrix: null,
                intermediateMatrices: []
            };
        let numberElementaryOperations = 0;
        let U: SquareMatrix;
        let alpha = 1 / (SquareMatrix.multiplyMatrices(this._matrix, this._matrix.getTransposeMatrix()) as SquareMatrix).getNorma();
        U = this._matrix.getTransposeMatrix().multiplyByNumber(alpha);
        let E = new IdentityMatrix(this._matrix.size);

        let psi: SquareMatrix = (SquareMatrix.sumMatrices(E, (SquareMatrix.multiplyMatrices(this._matrix, U) as SquareMatrix).multiplyByNumber(-1)) as SquareMatrix);;
        let matrices: Array<SquareMatrix> = [];
        matrices.push(Matrix.getCopyOfMatrix<SquareMatrix>(U, SquareMatrix));
        let norma = psi.getNorma();
        while (norma > eps) {
            psi = (SquareMatrix.sumMatrices(E, (SquareMatrix.multiplyMatrices(this._matrix, U) as SquareMatrix).multiplyByNumber(-1)) as SquareMatrix);
            U = (SquareMatrix.multiplyMatrices(U, (SquareMatrix.sumMatrices(E, psi) as SquareMatrix)) as SquareMatrix);
            norma = psi.getNorma();
            matrices.push(Matrix.getCopyOfMatrix<SquareMatrix>(U, SquareMatrix));
            numberElementaryOperations += Math.pow(this._matrix.size, 3);
        }
        numberElementaryOperations = Math.max(numberElementaryOperations, Math.pow(this._matrix.size, 3));
        return {
            numberOperations: numberElementaryOperations,
            inverseMatrix: U,
            intermediateMatrices: matrices
        };
    }
}

export default MatrixInverter;
