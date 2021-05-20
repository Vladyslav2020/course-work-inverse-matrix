import Matrix from "./MatrixClass.js";

class SquareMatrix extends Matrix{
    constructor(size){
        super(size, size);
        this._size = size;
    }
    get size(){
        return this._size;
    }
    // getInverseMatrix() {
    //     if (this.getDeterminant() === 0) {
    //         return null;
    //     }
    //     let extendedMatrix = new ExtendedMatrix(this);
    //     extendedMatrix.processMatrix();
    //     let matrix = new SquareMatrix(this._size);
    //     for (let i = 0; i <this._size; i++) {
    //         for (let j =this._size; j < 2 * this._size; j++) {
    //             matrix.setElementAt(j - this._size, i, extendedMatrix.getElementAt(j, i));
    //         }
    //     }
    //     return matrix;
    // }

    static generateMatrix(N)
    {
        let matrix = new SquareMatrix(N);
        for (let i = 0; i < N; i++)
            for (let j = 0; j < N; j++) {
                matrix.setElementAt(j, i, Math.floor(Math.random() * 100));
            }
        return matrix;
    }

    static multiplyMatrices(matrix1, matrix2)
    {
        if (matrix1._size !== matrix2._size)
            return null;
        let matrix = new SquareMatrix(matrix1._size);
        for (let i = 0; i < matrix1._size; i++)
            for (let j = 0; j < matrix2._size; j++) {
                let sum = 0;
                for (let k = 0; k < matrix1._size; k++)
                    sum += matrix1._elements[i][k] * matrix2._elements[k][j];
                matrix.setElementAt(j, i, sum);
            }
        return matrix;
    }

    getTransposeMatrix()
    {
        let matrix = new SquareMatrix(this._size);
        for (let i = 0; i < this._size; i++)
            for (let j = 0; j < this._size; j++) {
                matrix.setElementAt(i, j,this._elements[i][j]);
            }
        return matrix;
    }

    getMaxElement()
    {
        let max = -1;
        for (let i = 0; i < this._size; i++)
            for (let j = 0; j < this._size; j++)
                max = Math.max(max, Math.abs(this._elements[i][j]));
        return max;
    }

    getDeterminant()
    {
        let copy = new SquareMatrix(this._size);
        for (let i = 0; i < this._size; i++)
            for (let j = 0;  j < this._size; j++)
                copy.setElementAt(j, i, this._elements[i][j]);

        let K = 1;

        for (let i = 0; i < copy._size; i++) {
            if (copy._elements[i][i] === 0) {
                for (let j = i + 1; j < copy._size; j++) {
                    if (copy._elements[j][i] !== 0) {
                        this.swapRows(i, j);
                        K *= -1;
                    }
                }
            }
            if (copy._elements[i][i] === 0)
                break;
            K *= copy._elements[i][i];
            copy.multiplyRow(i, 1 / copy._elements[i][i]);
            for (let j = i + 1; j < copy._size; j++) {
                let coefficient = copy._elements[j][i];
                for (let k = 0; k < this._size; k++) {
                    copy._elements[j][k] -= coefficient * copy._elements[i][k];
                }
            }
        }
        let determinant = K;
        for (let i = 0; i < copy._size; i++)
            determinant *= copy._elements[i][i];
        return determinant;
    }

    multiplyByNumber(number)
    {
        let matrix = new SquareMatrix(this._size);
        for (let i = 0; i < this._size; i++)
            for (let j = 0; j < this._size; j++) {
                matrix.setElementAt(j, i,this._elements[i][j] * number);
            }
        return matrix;
    }

    sumMatrices(matrix1, matrix2)
    {
        if (matrix1._size !== matrix2._size)
            return null;
        let newMatrix = new SquareMatrix(matrix1._size);
        for (let i = 0; i < matrix1._size; i++)
            for (let j = 0; j < matrix1._size; j++) {
                newMatrix.setElementAt(j, i, matrix1._elements[i][j] + matrix2._elements[i][j]);
        }
        return newMatrix;
    }

    getInverseMatrixSchultzMethod(eps, m = 2)
    {
        if (this.getDeterminant() === 0)
            return null;
        let U = new SquareMatrix(this._size);
        let someMatrix = new SquareMatrix(this._size);
        for (let i = 0; i <this._size; i++)
            for (let j = 0; j <this._size; j++)
                someMatrix._elements[i][j] =this._elements[i][j] *this._elements[j][i];
        let maxElem = SquareMatrix.multiplyMatrices(this, this.getTransposeMatrix()).getMaxElement();
        maxElem = someMatrix.getMaxElement();
        let alpha = 2 / maxElem;
        U = this.getTransposeMatrix().multiplyByNumber(alpha);

        console.log("Matrix U:");
        U.printMatrix();
        let E = new IdentityMatrix(this._size);
        console.log("Matrix E:");
        E.printMatrix();
        /*console.log("U * A: \n";
        multiplyMatrices(U, this).printMatrix();
        SquareMatrix* psi = sumMatrices(E, multiplyMatrices(U, this).multiplyByNumber(-1));
        console.log("Matrix Psi: \n";
        psi.printMatrix();
        let determinant = fabs(psi.getDeterminant());
        while (determinant > eps) {
            console.log("Determinant: " << psi.getDeterminant() << endl;
            U = multiplyMatrices(U, sumMatrices(E, sumMatrices(psi, multiplyMatrices(psi, psi))));
            console.log("Matrix U: \n";
            U.printMatrix();
            psi = sumMatrices(E, multiplyMatrices(U, this).multiplyByNumber(-1));
            console.log("Matrix Psi: \n";
            psi.printMatrix();
            determinant = psi.getDeterminant();
            if (determinant > 2) {
                console.log("Algorithm divergence\n";
                break;
            }
        }*/
        let psi = new SquareMatrix(this._size);
        let k = 0, norma;
        do {
            k++;
            for (let i = 0; i < this._size; i++)
                for (let j = 0; j < this._size; j++)
                    psi._elements[i][j] = E._elements[i][j] -this._elements[i][j] * U._elements[i][j];
            console.log("Matrix Psi:");
            psi.printMatrix();
            for (let i = 0; i < this._size; i++)
                for (let j = 0; j < this._size; j++)
                    U._elements[i][j] = U._elements[i][j] * (E.getElementAt(j, i) + psi._elements[i][j] + Math.pow(psi._elements[i][j], 2));
            console.log("Matrix U:");
            U.printMatrix();
            console.log("Determinant:", psi.getDeterminant());
            norma = 0;
            for (let i = 0; i < this._size; i++)
                for (let j = 0; j < this._size; j++)
                    norma = Math.max(norma, Math.pow(U._elements[i][j], 2));
        }
        while (norma > eps && k < 100);
    return U;
    }
}

export default SquareMatrix;

// import ExtendedMatrix from "./ExtendedMatrixClass.js";
// import IdentityMatrix from "./IdentityMatrixClass.js";

// SquareMatrix::SquareMatrix(SquareMatrix& matrix):this._size(matrix._size), Matrix(matrix._size, matrix._size)
// {
//     for (int i = 0; i <this._size; i++)
//     for (int j = 0; j <this._size; j++) {
//     setElementAt(j, i, matrix._elements[i][j]);
// }
// }
