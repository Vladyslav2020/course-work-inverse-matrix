import React from 'react';

interface PropTypes{
    dimension: number;
}

class InputMatrix extends React.Component<PropTypes, null>{
    constructor(props: PropTypes){
        super(props);
    }
    render(){
        let arr: number[][] = [];
        for (let i = 0; i < this.props.dimension; i++){
            arr.push([]);
            for (let j = 0; j < this.props.dimension; j++){
                arr[i].push(0);
            }
        }
        let matrix = arr.map(item => 
            <tr>
                {item.map(matrixElem => 
                    <td>
                        <input className = 'matrix-item' 
                            value = {String(matrixElem)}
                        />
                    </td>
                )}
            </tr>
        );
        return (
            <table className = "matrix">
                {matrix}
            </table>
        );
    }
}