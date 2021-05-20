import SquareMatrix from "./SquareMatrixClass";
import IdentityMatrix from "./IdentityMatrixClass";
import ExtendedMatrix from "./ExtendedMatrixClass";

// @ts-ignore
SquareMatrix.prototype.getInverseMatrixGaussMethod = function(){
    if (this.getDeterminant() === 0) {
        return null;
    }
    let extendedMatrix = new ExtendedMatrix(this);
    extendedMatrix.processMatrix();
    let matrix = new SquareMatrix(this.size);
    for (let i = 0; i < this.size; i++) {
        for (let j = this.size; j < 2 * this.size; j++) {
            matrix.setElementAt(j - this.size, i, extendedMatrix.getElementAt(j, i));
        }
    }
    return matrix;
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
