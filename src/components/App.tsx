import React from 'react';
import Body from './Body';
import Settings from './Settings';
import Title from './Title';
import SquareMatrix from "../MatrixClasses/SquareMatrix";
import MessageBox from "./MessageBox";
import ExtendedMatrix from "../MatrixClasses/ExtendedMatrixClass";

interface SettingsType{
    dimension: number;
    method: string;
    eps: number;
    numberDecimalPlaces: number;
    showSteps: boolean;
}

interface MatrixData{
    inputMatrix: SquareMatrix;
    needToShowInvertingMatrix: boolean;
    inverseMatrix: SquareMatrix | null;
    intermediateMatrices: Array<SquareMatrix | ExtendedMatrix>;
}

interface MessageType{
    text: string;
}

interface StateType{
    settings: SettingsType;
    matrixData: MatrixData;
    messageBox: MessageType;
}

class App extends React.Component<{}, StateType>{
    constructor(props = {}){
        super(props);
        this.state = {
            messageBox: {
                text: ''
            },
            settings: {
                dimension: 1,
                method: "",
                eps: 0.001,
                numberDecimalPlaces: 3,
                showSteps: false
            },
            matrixData: {
                inputMatrix: new SquareMatrix(1),
                needToShowInvertingMatrix: false,
                inverseMatrix: null,
                intermediateMatrices: []
            }
        };
        this.dimensionChangeHandler = this.dimensionChangeHandler.bind(this);
        this.methodChangeHandler = this.methodChangeHandler.bind(this);
        this.epsilonChangeHandler = this.epsilonChangeHandler.bind(this);
        this.numberDecimalPlacesChangeHandler = this.numberDecimalPlacesChangeHandler.bind(this);
        this.matrixItemChangeHandler = this.matrixItemChangeHandler.bind(this);
        this.fillMatrixRandomly = this.fillMatrixRandomly.bind(this);
        this.invertMatrix = this.invertMatrix.bind(this);
        this.hideMessageBox = this.hideMessageBox.bind(this);
        this.showStepsChangeHandler = this.showStepsChangeHandler.bind(this);
    }
    showStepsChangeHandler():void{
        this.setState(prevState => ({...prevState, settings: {
                ...prevState.settings,
                showSteps: !this.state.settings.showSteps
            }}));
    }
    hideMessageBox(event: React.MouseEvent<HTMLDivElement>):void{
        if ((event.target as any).matches('.message-box-wrapper') || (event.target as any).matches('.close i'))
            this.setState(prevState => ({...prevState,
                messageBox: {
                    text: ''
                }
            }));
    }
    invertMatrix():void{
        let inverseMatrix: SquareMatrix | null;
        if (this.state.settings.method){
            if (this.state.settings.method === 'Gauss') {
                // @ts-ignore
                inverseMatrix = this.state.matrixData.inputMatrix.getInverseMatrixGaussMethod();
            }
            else if (this.state.settings.method === 'Schultz'){
                // @ts-ignore
                inverseMatrix = this.state.matrixData.inputMatrix.getInverseMatrixSchultzMethod();
            }
            this.setState(prevState => ({...prevState,
                matrixData: {
                    ...prevState.matrixData,
                    needToShowInvertingMatrix: true,
                    inverseMatrix
                }
            }));
        }
        else if (!this.state.settings.method){
            this.setState(prevState => ({...prevState,
                messageBox: {
                    text: "You need to choose the method to invert the matrix!!"
                }
            }));
        }
    }
    matrixItemChangeHandler(x: number, y: number, value: number): void{
        let matrix = this.state.matrixData.inputMatrix;
        matrix.setElementAt(x, y, value);
        this.setState(prevState => ({...prevState,
            matrixData: {
                ...prevState.matrixData,
                needToShowInvertingMatrix: false,
                inputMatrix: matrix
            }
        }));
    }
    fillMatrixRandomly():void{
        let inputMatrix = this.state.matrixData.inputMatrix;
        for(let i = 0; i < inputMatrix.size; i++)
            for (let j = 0; j < inputMatrix.size; j++){
                inputMatrix.elements[i][j] = Math.floor(Math.random() * 100);
            }
        this.setState(prevState => ({...prevState,
            matrixData: {
                ...prevState.matrixData,
                needToShowInvertingMatrix: false,
                inputMatrix
            }
        }));
    }
    dimensionChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void{
        let currentValue = Math.floor(Number(event.target.value));
        currentValue = Math.max(currentValue, 1);
        currentValue = Math.min(currentValue, 20);
        this.setState(prevState => ({...prevState,
            settings: {
                ...prevState.settings,
                dimension: currentValue
            },
            matrixData: {
                ...prevState.matrixData,
                needToShowInvertingMatrix: false,
                inputMatrix: new SquareMatrix(currentValue)
            }
        }));
    }
    methodChangeHandler(method: string): void{
        this.setState(prevState => ({...prevState, settings: {...prevState.settings, method}}));
    }
    epsilonChangeHandler(eps: number): void{
        this.setState(prevState => ({...prevState, settings: {...prevState.settings, eps}}));
    }
    numberDecimalPlacesChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void{
        let currentValue = Math.floor(Number(event.target.value));
        currentValue = Math.max(currentValue, 0);
        currentValue = Math.min(currentValue, 7);
        this.setState(prevState => ({...prevState, settings: {...prevState.settings, numberDecimalPlaces: currentValue}}));
    }
    render(){
        return (
            <div className = "app">
                {this.state.messageBox.text ? <MessageBox message = {this.state.messageBox.text} hideMessageBox={this.hideMessageBox} />: false}
                <Title />
                <div className = "body-wrapper">
                    <Settings
                        method = {this.state.settings.method}
                        dimension = {this.state.settings.dimension}
                        eps = {this.state.settings.eps}
                        numberDecimalPlaces = {this.state.settings.numberDecimalPlaces}
                        showSteps = {this.state.settings.showSteps}
                        showStepsChangeHandler = {this.showStepsChangeHandler}
                        dimensionChangeHandler = {this.dimensionChangeHandler}
                        methodChangeHandler = {this.methodChangeHandler}
                        epsilonChangeHandler = {this.epsilonChangeHandler}
                        numberDecimalPlacesChangeHandler = {this.numberDecimalPlacesChangeHandler}
                    />
                    <Body matrixData = {this.state.matrixData}
                          settings = {this.state.settings}
                          fillMatrixRandomly = {this.fillMatrixRandomly}
                          matrixItemChangeHandler = {this.matrixItemChangeHandler}
                          needToShowInvertingMatrix = {this.state.matrixData.needToShowInvertingMatrix}
                          invertMatrix = {this.invertMatrix}
                    />
                </div>
            </div>
        )
    }
}

export default App;
