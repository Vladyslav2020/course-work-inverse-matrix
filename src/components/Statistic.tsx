import React from 'react';

interface PropTypes{
    numberOperations: number;
    numberIterations: number;
}

let Statistic:React.FC<PropTypes> = (props) => {
    return (
        <div className = 'statistic'>
            <div className = 'title-input-matrix'>Statistic</div>
            <div className = 'statistic-item'>Number iterations: {props.numberIterations}</div>
            <div className = 'statistic-item'>Number elementary operations: {props.numberOperations}</div>
        </div>
    );
}

export default Statistic;
