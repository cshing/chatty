import React from 'react';

export default function Message(props) {
    return (
        <section>
            <div className="message">
                <span className="message-username">{ props.username }</span>
                <span className="message-content">{ props.content }</span>
            </div>
            <div className="message system">
                { props.notification }
            </div>
        </section>
    );
}