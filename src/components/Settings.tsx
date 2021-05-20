import React from 'react';

interface StateType{
    epsilon: string;
}

interface PropTypes{
    method: string;
    dimension: number;
    eps: number;
    numberDecimalPlaces: number;
    dimensionChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    methodChangeHandler: (method: string) => void;
    epsilonChangeHandler: (eps: number) => void;
    numberDecimalPlacesChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

class Settings extends React.Component<PropTypes, StateType>{
    constructor(props: PropTypes){
        super(props);
        this.state = {
            epsilon: '0.001'
        };
        this.epsChangeHandler = this.epsChangeHandler.bind(this);
    }
    epsChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void{
        let currentValue = Number(event.target.value);
        if (currentValue > 1 || currentValue < 0){
            currentValue = Math.max(currentValue, 0);
            currentValue = Math.min(currentValue, 1);
            this.setState({epsilon: String(currentValue)});
        }
        else{
            this.setState({epsilon: event.target.value});
        }
        this.props.epsilonChangeHandler(currentValue);
    }
        // let matrix = document.querySelector(".matrix");
        // for (let i = matrix.children.length - 1; i >= 0; i--){
        //     matrix.children[i].remove();
        // }
        // let dimension = Number(event.target.value);
        // dimension = Math.floor(dimension);
        // dimension = Math.max(dimension, 1);
        // dimension = Math.min(dimension, 20);
        // for (let i = 0; i < dimension; i++){
        //     let tr = document.createElement('tr');
        //     matrix.append(tr);
        //     for (let j = 0; j < dimension; j++){
        //         let td = document.createElement("td");
        //         let matrixElement = document.createElement('input');
        //         matrixElement.classList.add('matrix-item');
        //         matrixElement.setAttribute("value", "0");
        //         td.append(matrixElement);
        //         tr.append(td);
        //     }
        // }
    render(){
        return(
            <div className="settings">
                <div className="setting-item number-input">
                    <div className = 'setting-item-title'>1. Select matrix size</div>
                    <input type="number"
                        id = 'dimension'
                        value = {String(this.props.dimension)}
                        min = "1"
                        max = "20"
                        onChange = {this.props.dimensionChangeHandler}
                    />
                </div>
                <div className = "setting-item">
                    <div className = 'setting-item-title'>2. Select a matrix inversion method</div>
                    <form action="">
                        <label htmlFor="gauss" className = {this.props.method === 'Gauss'? "selected": ""}>
                            <input type="radio" id = "gauss" name = "radio"
                                onChange = {() => this.props.methodChangeHandler("Gauss")}
                            />
                            &nbsp;Jordan Gauss method
                        </label>
                        <label htmlFor="schultz" className = {this.props.method === 'Schultz'? "selected": ""}>
                            <input type="radio" id = "schultz" name = "radio"
                                onChange = {() => this.props.methodChangeHandler("Schultz")}
                            />
                            &nbsp;Schultz's method
                        </label>
                    </form>
                </div>
                <div className = "setting-item number-input">
                    <div className = {`setting-item-title ${this.props.method !== 'Schultz'? 'disabled': ''}`}>3. Choose method accuracy</div>
                    <input type="number"
                        id = 'epsilon'
                        disabled = {this.props.method != 'Schultz'}
                        value = {this.state.epsilon}
                        min = "0"
                        max = "1"
                        step = "0.001"
                        onChange = {this.epsChangeHandler}
                    />
                </div>
                <div className="setting-item number-input">
                    <div className = 'setting-item-title'>4. Select the number of decimal places in the inverse matrix</div>
                    <input type="number"
                        id = 'number-decimal-places'
                        value = {String(this.props.numberDecimalPlaces)}
                        min = "0"
                        max = "7"
                        onChange = {this.props.numberDecimalPlacesChangeHandler}
                    />
                </div>
            </div>
        );
    }
}

export default Settings;
