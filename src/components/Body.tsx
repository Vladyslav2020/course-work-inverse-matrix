import React from 'react';
import InputMatrix from "./InputMatrix";
import SquareMatrix from "../MatrixClasses/SquareMatrixClass";
import Buttons from "./Buttons";
import MatrixUI from "./MatrixUI";
import ExtendedMatrix from "../MatrixClasses/ExtendedMatrixClass";

interface SettingsType{
    dimension: number;
    method: string;
    eps: number;
    numberDecimalPlaces: number;
    showSteps: boolean;
}

interface MatrixData {
    inputMatrix: SquareMatrix;
    needToShowInvertingMatrix: boolean;
    inverseMatrix: SquareMatrix | null;
    intermediateMatrices: Array<SquareMatrix | ExtendedMatrix>;
}

interface PropTypes{
    settings: SettingsType;
    matrixData: MatrixData;
    matrixItemChangeHandler: (x: number, y: number, value: number) => void;
    fillMatrixRandomly: () => void;
    needToShowInvertingMatrix: boolean;
    invertMatrix: () => void;
}

class Body extends React.Component<PropTypes>{
    render(){
        let inverseMatrixUI = null;
        if (this.props.needToShowInvertingMatrix && this.props.matrixData.inverseMatrix){
            inverseMatrixUI = <MatrixUI matrix = {this.props.matrixData.inverseMatrix}
                                        numberDecimalPlaces={this.props.settings.numberDecimalPlaces}
                                        titleOfMatrix = "Inverse matrix"
            />;
        }
        return(
            <div className="body">
                <Buttons fillMatrixRandomly = {this.props.fillMatrixRandomly}
                         invertMatrix = {this.props.invertMatrix}
                />
                <InputMatrix dimension = {this.props.settings.dimension}
                             matrix = {this.props.matrixData.inputMatrix}
                             matrixItemChangeHandler = {this.props.matrixItemChangeHandler}
                />
                {inverseMatrixUI}
            </div>
        );
    }
}

export default Body;
