import React, { Component } from 'react';
import autoscroll from 'autoscroll-react'
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        const messages = this.props.messages.map(message => {
            return <Message 
                key={ message.id }
                username={ message.username }
                content={ message.content }
                notification={ message.notification}
                userColor={ message.userColor } />
        });

        return (
            <main className="messages">
                { messages }
            </main>
        );
    }
}

export default autoscroll(MessageList)