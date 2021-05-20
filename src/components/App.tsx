import React from 'react';
import Body from './Body';
import Settings from './Settings';
import Title from './Title';

interface StateType{
    dimension: number;
    method: string;
    matrix: number[][];
    eps: number;
    numberDecimalPlaces: number;
}

class App extends React.Component<{}, StateType>{
    constructor(props = {}){
        super(props);
        this.state = {
            dimension: 1,
            method: "",
            matrix: [[0]],
            eps: 0.001,
            numberDecimalPlaces: 3
        };
        this.dimensionChangeHandler = this.dimensionChangeHandler.bind(this);
        this.methodChangeHandler = this.methodChangeHandler.bind(this);
        this.epsilonChangeHandler = this.epsilonChangeHandler.bind(this);
        this.numberDecimalPlacesChangeHandler = this.numberDecimalPlacesChangeHandler.bind(this);
    }
    dimensionChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void{
        let currentValue = Math.floor(Number(event.target.value));
        currentValue = Math.max(currentValue, 1);
        currentValue = Math.min(currentValue, 20);
        this.setState(prevState => ({...prevState, dimension: currentValue}));
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
                    <Body />
                </div>
            </div>
        )
    }
}

export default App;