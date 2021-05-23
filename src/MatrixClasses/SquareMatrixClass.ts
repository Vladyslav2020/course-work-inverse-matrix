import Matrix from "./MatrixClass";

class SquareMatrix extends Matrix{
    protected _size: number;
    constructor(size: number){
        super(size, size);
        this._size = size;
    }
    get size(){
        return this._size;
    }

    static generateMatrix(N: number)
    {
        let matrix = new SquareMatrix(N);
        for (let i = 0; i < N; i++)
            for (let j = 0; j < N; j++) {
                matrix.setElementAt(j, i, Math.floor(Math.random() * 100));
            }
        return matrix;
    }

    static multiplyMatrices(matrix1: SquareMatrix, matrix2: SquareMatrix)
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

    getMaxSumOfRow(){
        let max = 0;
        for (let i = 0; i < this._size; i++){
            let sum = 0;
            for(let j = 0; j < this._size; j++)
                sum += Math.abs(this._elements[i][j]);
            max = Math.max(max, sum);
        }
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

    multiplyByNumber(number: number)
    {
        let matrix = new SquareMatrix(this._size);
        for (let i = 0; i < this._size; i++)
            for (let j = 0; j < this._size; j++) {
                matrix.setElementAt(j, i,this._elements[i][j] * number);
            }
        return matrix;
    }

    static sumMatrices(matrix1: SquareMatrix, matrix2: SquareMatrix)
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

    getNorma(): number
    {
        let result = 0;
        for (let i = 0; i < this._size; i++)
            for (let j = 0; j < this._size; j++)
                result += Math.pow(Math.abs(this._elements[i][j]), 2);
        return Math.pow(result, 0.5);
    }
}

export default SquareMatrix;
