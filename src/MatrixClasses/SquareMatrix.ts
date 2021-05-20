import SquareMatrix from "./SquareMatrixClass";
import IdentityMatrix from "./IdentityMatrixClass";
import ExtendedMatrix from "./ExtendedMatrixClass";

interface ReturnType{
    intermediateMatrices: Array<ExtendedMatrix>;
    inverseMatrix: SquareMatrix | null;
}

// @ts-ignore
SquareMatrix.prototype.getInverseMatrixGaussMethod = function(): ReturnType{
    if (this.getDeterminant() === 0) {
        return {
            intermediateMatrices: [],
            inverseMatrix: null
        };
    }
    let extendedMatrix = new ExtendedMatrix(this);
    let copyMatrix = new ExtendedMatrix(new IdentityMatrix(this.size));
    for (let i1 = 0; i1 < this.size; i1++)
        for (let j1 = 0; j1 < this.size * 2; j1++){
            copyMatrix.setElementAt(j1, i1, extendedMatrix.elements[i1][j1]);
        }
    let matrices = extendedMatrix.processMatrix();
        matrices.unshift(copyMatrix);
    let matrix = new SquareMatrix(this.size);
    for (let i = 0; i < this.size; i++) {
        for (let j = this.size; j < 2 * this.size; j++) {
            matrix.setElementAt(j - this.size, i, extendedMatrix.getElementAt(j, i));
        }
    }
    return {
        intermediateMatrices: matrices,
        inverseMatrix: matrix
    };
}

// @ts-ignore
SquareMatrix.prototype.getInverseMatrixSchultzMethod = function(eps: number, m = 1)
{
    if (this.getDeterminant() === 0)
        return null;
    return null;
    let U = new SquareMatrix(this.size);
    let someMatrix = new SquareMatrix(this.size);
    for (let i = 0; i <this.size; i++)
        for (let j = 0; j <this.size; j++)
            someMatrix.elements[i][j] = this.elements[i][j] * this.elements[j][i];
    let maxElem; // = SquareMatrix.multiplyMatrices(this, this.getTransposeMatrix()).getMaxElement();
    maxElem = someMatrix.getMaxElement();
    let alpha = 2 / maxElem;
    U = this.getTransposeMatrix().multiplyByNumber(alpha);

    console.log("Matrix U:");
    U.printMatrix();
    let E = new IdentityMatrix(this.size);
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
    let psi = new SquareMatrix(this.size);
    let k = 0, norma;
    do {
        k++;
        for (let i = 0; i < this.size; i++)
            for (let j = 0; j < this.size; j++)
                psi.elements[i][j] = E.elements[i][j] -this.elements[i][j] * U.elements[i][j];
        console.log("Matrix Psi:");
        psi.printMatrix();
        for (let i = 0; i < this.size; i++)
            for (let j = 0; j < this.size; j++)
                U.elements[i][j] = U.elements[i][j] * (E.getElementAt(j, i) + psi.elements[i][j] + Math.pow(psi.elements[i][j], 2));
        console.log("Matrix U:");
        U.printMatrix();
        console.log("Determinant:", psi.getDeterminant());
        norma = 0;
        for (let i = 0; i < this.size; i++)
            for (let j = 0; j < this.size; j++)
                norma = Math.max(norma, Math.pow(U.elements[i][j], 2));
    }
    while (norma > eps && k < 100);
    return U;
}

export default SquareMatrix;
