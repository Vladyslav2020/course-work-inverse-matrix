import React from 'react';

interface PropTypes{
    fillMatrixRandomly: () => void;
    invertMatrix : () => void
}

class Buttons extends React.Component<PropTypes, any>{
    render(){
        return (
            <div className="buttons">
                <button className = 'btn fill-matrix-randomly'
                        onClick = {this.props.fillMatrixRandomly}
                >
                    Fill matrix randomly
                </button>
                <button className = 'btn invert-matrix'
                        onClick = {this.props.invertMatrix}
                >
                    Get inverse matrix
                </button>
            </div>
        );
    }
}

export default Buttons;
