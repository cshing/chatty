import React from 'react';

export default function Message(props) {
    return (
        <div className="message">
            <span className="message-notification">{ props.notification }</span>
            <span className="message-username">{ props.username }</span>
            <span className="message-content">{ props.content }</span>
        </div>
    );
}