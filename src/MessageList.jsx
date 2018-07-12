import React, { Component } from 'react';
import autoscroll from 'autoscroll-react'
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        const messages = this.props.messages.map(message => {
            return <Message 
                key={ message.id }
                username={ message.username }
                content={ message.content } />
        });

        return (
            <main className="messages">
                { this.props.notification }
                { messages }
            </main>
        );
    }
}

export default autoscroll(MessageList)