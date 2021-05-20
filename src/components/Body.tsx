import React from 'react';

class Body extends React.Component{
    render(){
        return(
            <div className="body">
                <div className="buttons">
                    <button className = 'btn fill-matrix-randomly'>Fill matrix randomly</button>
                    <button className = 'btn invert-matrix'>Get inverse matrix</button>
                </div>
                <div className="input-matrix">
                    <div className="title-input-matrix">Enter the elements of the matrix</div>
                    <table className = 'matrix'>
                        <tr>
                            <td><input type="text" className = "matrix-item" value = "0" /></td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default Body;