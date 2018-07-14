import React from 'react';

export default function Message(props) {

    const imgEnding = props.content.substr(props.content.length - 3);
    if ( imgEnding === 'jpg' || imgEnding === 'peg' || imgEnding === 'png' || imgEnding === 'gif' ) {
        return (
            <div className="message">
                <span className="message-notification"> { props.notification } </span>
                <span className="message-username" style={{color:props.userColor}} > { props.username } </span>
                <span className="message-content"> <img className="content-image" src={`${props.content}`} alt="imageUrl"/> </span>
            </div>
        );

    } else {
        return (
            <div className="message">
                <span className="message-notification"> { props.notification } </span>
                <span className="message-username" style={{color:props.userColor}} > { props.username } </span>
                <span className="message-content"> { props.content } </span>
            </div>
        );
    }
}

