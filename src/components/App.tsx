import React from 'react';
import Body from './Body';
import Settings from './Settings';
import Title from './Title';
import SquareMatrix from "../MatrixClasses/SquareMatrix";

interface StateType{
    dimension: number;
    method: string;
    eps: number;
    numberDecimalPlaces: number;
    inputMatrix: SquareMatrix;
    needToShowInvertingMatrix: boolean;
    inverseMatrix: SquareMatrix | null;
}

class App extends React.Component<{}, StateType>{
    constructor(props = {}){
        super(props);
        this.state = {
            dimension: 1,
            method: "",
            eps: 0.001,
            numberDecimalPlaces: 3,
            inputMatrix: new SquareMatrix(1),
            needToShowInvertingMatrix: false,
            inverseMatrix: null
        };
        this.dimensionChangeHandler = this.dimensionChangeHandler.bind(this);
        this.methodChangeHandler = this.methodChangeHandler.bind(this);
        this.epsilonChangeHandler = this.epsilonChangeHandler.bind(this);
        this.numberDecimalPlacesChangeHandler = this.numberDecimalPlacesChangeHandler.bind(this);
        this.matrixItemChangeHandler = this.matrixItemChangeHandler.bind(this);
        this.fillMatrixRandomly = this.fillMatrixRandomly.bind(this);
        this.invertMatrix = this.invertMatrix.bind(this);
    }
    invertMatrix():void{
        let inverseMatrix: SquareMatrix | null;
        if (this.state.method === 'Gauss') {
            // @ts-ignore
            inverseMatrix = this.state.inputMatrix.getInverseMatrixGaussMethod();
        }
        else if (this.state.method === 'Schultz'){
            // @ts-ignore
            inverseMatrix = this.state.inputMatrix.getInverseMatrixSchultzMethod();
        }

        this.setState(prevState => ({...prevState, needToShowInvertingMatrix: true, inverseMatrix}));
    }
    matrixItemChangeHandler(x: number, y: number, value: number): void{
        let matrix = this.state.inputMatrix;
        matrix.setElementAt(x, y, value);
        this.setState(prevState => ({...prevState, needToShowInvertingMatrix: false, inputMatrix: matrix}));
    }
    fillMatrixRandomly():void{
        let inputMatrix = this.state.inputMatrix;
        for(let i = 0; i < inputMatrix.size; i++)
            for (let j = 0; j < inputMatrix.size; j++){
                inputMatrix.elements[i][j] = Math.floor(Math.random() * 100);
            }
        this.setState(prevState => ({...prevState, needToShowInvertingMatrix: false, inputMatrix}));
    }
    dimensionChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void{
        let currentValue = Math.floor(Number(event.target.value));
        currentValue = Math.max(currentValue, 1);
        currentValue = Math.min(currentValue, 20);
        this.setState(prevState => ({...prevState,
            dimension: currentValue,
            needToShowInvertingMatrix: false,
            inputMatrix: new SquareMatrix(currentValue)
        }));
    }
    methodChangeHandler(method: string): void{
        this.setState(prevState => ({...prevState, method}));
    }
    epsilonChangeHandler(eps: number): void{
        this.setState(prevState => ({...prevState, eps}));
    }
    numberDecimalPlacesChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void{
        let currentValue = Math.floor(Number(event.target.value));
        currentValue = Math.max(currentValue, 0);
        currentValue = Math.min(currentValue, 7);
        this.setState(prevState => ({...prevState, numberDecimalPlaces: currentValue}));
    }
    render(){
        return (
            <div className = "app">
                <Title />
                <div className = "body-wrapper">
                    <Settings
                        method = {this.state.method}
                        dimension = {this.state.dimension}
                        eps = {this.state.eps}
                        numberDecimalPlaces = {this.state.numberDecimalPlaces}
                        dimensionChangeHandler = {this.dimensionChangeHandler}
                        methodChangeHandler = {this.methodChangeHandler}
                        epsilonChangeHandler = {this.epsilonChangeHandler}
                        numberDecimalPlacesChangeHandler = {this.numberDecimalPlacesChangeHandler}
                    />
                    <Body inputMatrix = {this.state.inputMatrix}
                          dimension = {this.state.dimension}
                          fillMatrixRandomly = {this.fillMatrixRandomly}
                          matrixItemChangeHandler = {this.matrixItemChangeHandler}
                          needToShowInvertingMatrix = {this.state.needToShowInvertingMatrix}
                          inverseMatrix = {this.state.inverseMatrix}
                          invertMatrix = {this.invertMatrix}
                          numberDecimalPlaces = {this.state.numberDecimalPlaces}
                    />
                </div>
            </div>
        )
    }
}

export default App;
