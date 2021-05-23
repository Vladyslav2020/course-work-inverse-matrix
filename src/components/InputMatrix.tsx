import React from 'react';
import SquareMatrix from "../MatrixClasses/SquareMatrixClass";

interface PropTypes{
    dimension: number;
    matrix: SquareMatrix;
    matrixItemChangeHandler: (x: number, y: number, value: number) => void;
}

interface StateType{
    matrixUI: Array<Array<string>>;
}

class InputMatrix extends React.Component<PropTypes, StateType>{
    constructor(props: PropTypes) {
        super(props);
        this.state = {
            matrixUI: this.props.matrix.elements.map(row => row.map(item => String(item)))
        };
    }
    changeHandler(x: number, y: number, event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.value.length >= 16)
            return;
        let currentValue = '';
        for (let i = 0; i < event.target.value.length; i++){
            let char: string = event.target.value[i];
            if (!isNaN(Number(currentValue + char)) || (i === 0 && char === '-'))
                currentValue += char;
        }
        if (currentValue.length > 1 && currentValue[0] !== '-'){
            let numberParts = currentValue.split('.');
            numberParts[0] = String(Number(numberParts[0]));
            let hasDot: boolean = currentValue.indexOf('.') === currentValue.length - 1;
            currentValue = numberParts.join('.');
        }
        this.props.matrixItemChangeHandler(x, y, parseFloat(currentValue) || 0);
        let matrixUI = this.state.matrixUI;
        matrixUI[y][x] = currentValue;
        this.setState({matrixUI: [...matrixUI]});
    }

    componentDidUpdate(prevProps: Readonly<PropTypes>, prevState: Readonly<StateType>, snapshot?: any) {
        if (this.props.dimension !== this.state.matrixUI.length){
            this.setState({matrixUI: this.props.matrix.elements.map(row => row.map(item => String(item)))});
        }
        else
            for (let i = 0; i < this.props.dimension; i++)
                for (let j = 0; j < this.props.dimension; j++)
                    if((this.state.matrixUI[i][j] !== '-' || this.props.matrix.elements[i][j] !== 0) && Number(this.state.matrixUI[i][j]) !== this.props.matrix.elements[i][j]){
                        this.setState({matrixUI: this.props.matrix.elements.map(row => row.map(item => String(item)))});
                        return;
                    }
    }
    blurHandler(x: number, y: number){
        let matrixUI = this.state.matrixUI;
        matrixUI[y][x] = String(this.props.matrix.elements[y][x]);
        this.setState({matrixUI: [...matrixUI]});
        Math.min()
    }
    render(){
        let matrixUI = this.state.matrixUI.map((item, y) =>
            <tr key = {y}>
                {item.map((matrixElem, x) =>
                    <td key = {this.props.dimension * y + x}>
                        <input className = 'matrix-item'
                               value = {matrixElem}
                               onChange = {this.changeHandler.bind(this, x, y)}
                               onBlur = {this.blurHandler.bind(this, x, y)}
                        />
                    </td>
                )}
            </tr>
        );
        return (
            <>
                <div className="title-input-matrix">Enter the elements of the matrix</div>
                <table className = "matrix">
                    {matrixUI}
                </table>
            </>
        );
    }
}

export default InputMatrix;
