import React from 'react';

export default function Message(props) {

    constructor(props) {
        super(props);
        this.setUsernameColor = this.setUsernameColor.bind(this);
    }

    // setUsernameColor(username) {

    // }
    
    render () {
        return (
            <div className="message">
                <span className="message-notification">{ props.notification }</span>
                <span className="message-username" style={{color: 'blue'}}>{ props.username }</span>
                <span className="message-content">{ props.content }</span>
            </div>
        );
    }
}

