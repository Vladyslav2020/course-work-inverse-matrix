import React from 'react';

interface PropTypes{
    message: string;
    hideMessageBox: (event: React.MouseEvent<HTMLDivElement>) => void;
}

class MessageBox extends React.Component<PropTypes>{
    render(){
        return (
            <div className = 'message-box-wrapper' onClick = {this.props.hideMessageBox}>
                <div className = 'message-box'>
                    <div className= 'close'>
                        <i className="far fa-times-circle"></i>
                    </div>
                    <div className = 'text'>
                        {this.props.message}
                    </div>
                </div>
            </div>
        )
    }
}

export default MessageBox;
