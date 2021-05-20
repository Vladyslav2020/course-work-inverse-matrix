import React from 'react';
import InputMatrix from "./InputMatrix";
import SquareMatrix from "../MatrixClasses/SquareMatrixClass";
import Buttons from "./Buttons";
import MatrixUI from "./MatrixUI";

interface PropTypes{
    dimension: number;
    inputMatrix: SquareMatrix;
    numberDecimalPlaces: number;
    matrixItemChangeHandler: (x: number, y: number, value: number) => void;
    fillMatrixRandomly: () => void;
    needToShowInvertingMatrix: boolean;
    inverseMatrix: SquareMatrix | null;
    invertMatrix: () => void;
}

class Body extends React.Component<PropTypes>{
    render(){
        let inverseMatrixUI = null;
        if (this.props.needToShowInvertingMatrix && this.props.inverseMatrix){
            inverseMatrixUI = <MatrixUI matrix = {this.props.inverseMatrix}
                                        numberDecimalPlaces={this.props.numberDecimalPlaces}
            />;
        }
        return(
            <div className="body">
                <Buttons fillMatrixRandomly = {this.props.fillMatrixRandomly}
                         invertMatrix = {this.props.invertMatrix}
                />
                <InputMatrix dimension = {this.props.dimension}
                             matrix = {this.props.inputMatrix}
                             matrixItemChangeHandler = {this.props.matrixItemChangeHandler}
                />
                {inverseMatrixUI}
            </div>
        );
    }
}

export default Body;
