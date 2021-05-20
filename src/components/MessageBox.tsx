import React from 'react';

interface PropTypes{
    message: string;
}

class MessageBox extends React.Component{
    render(){
        return (
            <div className = 'message-box-wrapper'>
                <div className = 'message-box'>
                    <div className= 'close'><i className="far fa-window-close"></i></div>
                    <div className = 'text'>

                    </div>
                </div>
            </div>
        )
    }
}

export default MessageBox;
