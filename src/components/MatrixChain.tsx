import React from 'react';
import SquareMatrix from "../MatrixClasses/SquareMatrixClass";
import ExtendedMatrix from "../MatrixClasses/ExtendedMatrixClass";
import MatrixUI from "./MatrixUI";

interface PropTypes{
    inputMatrix: SquareMatrix;
    inverseMatrix: SquareMatrix;
    intermediateMatrices: Array<SquareMatrix | ExtendedMatrix>;
    numberDecimalPlaces: number;
    //showStepsChangeHandler: () => void;
    visibleMatrixChainChangeHandler: (visibility: boolean) => void;
}

class MatrixChain extends React.Component<PropTypes, {}>{
    clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        // @ts-ignore
        if (event.target.matches(".message-box-wrapper") || event.target.matches(".close i")){
            this.props.visibleMatrixChainChangeHandler(false);
        }
    }
    render(){
        let matrixChain = this.props.intermediateMatrices.map((matrix, index) =>
            <MatrixUI matrix = {matrix}
                      numberDecimalPlaces = {this.props.numberDecimalPlaces}
                      titleOfMatrix = {`${index + 1}. Step`}
                      key = {index + 1}
            />);
        matrixChain.unshift(
            <MatrixUI matrix = {this.props.inputMatrix}
                      numberDecimalPlaces = {this.props.numberDecimalPlaces}
                      titleOfMatrix={"Input matrix"}
                      key = {0}
            />
        );
        matrixChain.push(
            <MatrixUI matrix = {this.props.inverseMatrix}
                      numberDecimalPlaces = {this.props.numberDecimalPlaces}
                      titleOfMatrix = "Inverse matrix"
                      key = {this.props.intermediateMatrices.length + 1}
            />
        );
        return (
            <div className = "message-box-wrapper" onClick = {this.clickHandler}>
                <div className="matrix-chain">
                    <div className="close">
                        <i className="far fa-times-circle"></i>
                    </div>
                    <div className = "matrix-chain-body">
                        {matrixChain}
                    </div>
                </div>
            </div>
        )
    }
}

export default MatrixChain;
