import React from 'react';
import InputMatrix from "./InputMatrix";
import SquareMatrix from "../MatrixClasses/SquareMatrixClass";
import Buttons from "./Buttons";
import MatrixUI from "./MatrixUI";
import ExtendedMatrix from "../MatrixClasses/ExtendedMatrixClass";
import MatrixChain from "./MatrixChain";

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
        visibleMatrixChain: true
    };
    visibleMatrixChainChangeHandler = (visibility: boolean) => {
        this.setState({visibleMatrixChain: visibility});
    }
    componentDidUpdate(prevProps: Readonly<PropTypes>, prevState: Readonly<StateType>, snapshot?: any) {
        if (!this.state.visibleMatrixChain && (!prevProps.matrixData.needToShowInverseMatrix && this.props.matrixData.needToShowInverseMatrix) ||
            (this.props.settings.method !== prevProps.settings.method && this.props.matrixData.needToShowInverseMatrix))
            this.visibleMatrixChainChangeHandler(true);
    }

    render(){
        let inverseMatrixUI = null,
            matrixChain = null;
        if (this.props.matrixData.needToShowInverseMatrix && this.props.matrixData.inverseMatrix){
            inverseMatrixUI = <MatrixUI matrix = {this.props.matrixData.inverseMatrix}
                                        numberDecimalPlaces={this.props.settings.numberDecimalPlaces}
                                        titleOfMatrix = "Inverse matrix"
            />;
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
                {(!this.state.visibleMatrixChain && this.props.settings.showSteps && this.props.matrixData.needToShowInverseMatrix) &&
                    <div style = {{cursor: 'pointer', marginTop: '20px', color: 'green', fontSize: '20px',
                        padding: '5px 10px', fontWeight: 'bold', textShadow: '3px 3px 6px gray'}}
                         onClick = {() => this.visibleMatrixChainChangeHandler(true)}
                    >
                        Show steps to invert matrix
                    </div>
                }
                {matrixChain}
            </div>
        );
    }
}

export default Body;
