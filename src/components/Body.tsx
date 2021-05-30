import React from 'react';
import InputMatrix from "./InputMatrix";
import SquareMatrix from "../MatrixClasses/SquareMatrixClass";
import Buttons from "./Buttons";
import MatrixUI from "./MatrixUI";
import ExtendedMatrix from "../MatrixClasses/ExtendedMatrixClass";
import MatrixChain from "./MatrixChain";
import Statistic from "./Statistic";

interface SettingsType{
    dimension: number;
    method: string;
    eps: number;
    numberDecimalPlaces: number;
    showSteps: boolean;
}

interface MatrixData {
    inputMatrix: SquareMatrix;
    needToShowInverseMatrix: boolean;
    inverseMatrix: SquareMatrix | null;
    intermediateMatrices: Array<SquareMatrix | ExtendedMatrix>;
    numberOperations: number;
}

interface PropTypes{
    settings: SettingsType;
    matrixData: MatrixData;
    matrixItemChangeHandler: (x: number, y: number, value: number) => void;
    fillMatrixRandomly: () => void;
    invertMatrix: () => void;
    showStepsChangeHandler: () => void;
}

interface StateType{
    visibleMatrixChain: boolean;
}

class Body extends React.Component<PropTypes, StateType>{
    state = {
        visibleMatrixChain: false
    };
    visibleMatrixChainChangeHandler = (visibility: boolean) => {
        this.setState({visibleMatrixChain: visibility});
    }

    render(){
        let inverseMatrixUI = null,
            matrixChain = null,
            file = null;
        if (this.props.matrixData.needToShowInverseMatrix && this.props.matrixData.inverseMatrix){
            inverseMatrixUI = <MatrixUI matrix = {this.props.matrixData.inverseMatrix}
                                        numberDecimalPlaces={this.props.settings.numberDecimalPlaces}
                                        titleOfMatrix = "Inverse matrix"
            />;
            file = new Blob([JSON.stringify({
                originMatrix: {
                    size: this.props.matrixData.inputMatrix.size,
                    elements: this.props.matrixData.inputMatrix.elements
                },
                inverseMatrix: {
                    size: this.props.matrixData.inverseMatrix.size,
                    elements: this.props.matrixData.inverseMatrix.elements
                },
                numberOperations: this.props.matrixData.numberOperations,
                numberIterations: this.props.matrixData.intermediateMatrices.length - 1
            })], {
                type: 'application/json'
            });
            if (this.props.settings.showSteps && this.state.visibleMatrixChain){
                matrixChain = <MatrixChain inputMatrix = {this.props.matrixData.inputMatrix}
                                           inverseMatrix = {this.props.matrixData.inverseMatrix}
                                           intermediateMatrices = {this.props.matrixData.intermediateMatrices}
                                           numberDecimalPlaces = {this.props.settings.numberDecimalPlaces}
                                           visibleMatrixChainChangeHandler = {this.visibleMatrixChainChangeHandler}
                />;
            }
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
                {
                    inverseMatrixUI ?
                        <Statistic numberOperations={this.props.matrixData.numberOperations}
                                   numberIterations={this.props.matrixData.intermediateMatrices.length - 1}
                        /> : null
                }
                {(!this.state.visibleMatrixChain && this.props.settings.showSteps && this.props.matrixData.needToShowInverseMatrix) &&
                    <div className = "show-steps-button"
                         onClick = {() => this.visibleMatrixChainChangeHandler(true)}
                    >
                        Show steps to invert matrix
                    </div>
                }
                {matrixChain}
                {file !== null ? <a className = 'download-link' download = "statistic.json" href = {URL.createObjectURL(file)}>
                    <i className="fas fa-download"></i>
                    Download statistics file
                    <i className="fas fa-download"></i>
                </a>: null}
            </div>
        );
    }
}

export default Body;
