import React from 'react';
import SquareMatrix from "../MatrixClasses/SquareMatrixClass";

interface PropTypes{
    matrix: SquareMatrix;
    numberDecimalPlaces: number;
}

class MatrixUI extends React.Component<PropTypes, any>{
    render() {
        let dimension = this.props.matrix.size;
        console.log("Number decimal Places", this.props.numberDecimalPlaces);
        let matrixUI = this.props.matrix.elements.map((item, y) =>
            <tr key = {y}>
                {item.map((matrixElem, x) =>
                    <td key = {dimension * y + x}>
                        <p>{Math.round(matrixElem * Math.pow(10, this.props.numberDecimalPlaces)) / Math.pow(10, this.props.numberDecimalPlaces)}</p>
                    </td>
                )}
            </tr>
        );
        return (
            <table className = "matrix">
                {matrixUI}
            </table>
        );
    }
}

export default MatrixUI;
