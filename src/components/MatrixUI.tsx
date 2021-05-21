import React from 'react';
import SquareMatrix from "../MatrixClasses/SquareMatrixClass";
import ExtendedMatrix from "../MatrixClasses/ExtendedMatrixClass";

interface PropTypes{
    matrix: SquareMatrix | ExtendedMatrix;
    numberDecimalPlaces: number;
    titleOfMatrix: string;
}

class MatrixUI extends React.Component<PropTypes, any>{
    render() {
        let dimension = this.props.matrix.size;
        let matrixUI = this.props.matrix.elements.map((item, y) =>
            <tr key = {y}>
                {item.map((matrixElem, x) => (y === 0 && x === dimension?
                        <>
                            <td key = {-1} rowSpan = {dimension} className = 'separator'></td>
                            <td key = {dimension * y + x}>
                                <p>{Math.round(matrixElem * Math.pow(10, this.props.numberDecimalPlaces)) / Math.pow(10, this.props.numberDecimalPlaces)}</p>
                            </td>
                        </>:
                        <td key = {dimension * y + x}>
                            <p>{Math.round(matrixElem * Math.pow(10, this.props.numberDecimalPlaces)) / Math.pow(10, this.props.numberDecimalPlaces)}</p>
                        </td>
                    )
                )}
            </tr>
        );
        return (
            <>
                <div className="title-input-matrix">{this.props.titleOfMatrix}</div>
                <table className = "matrix">
                    {matrixUI}
                </table>
            </>

        );
    }
}

export default MatrixUI;
