import React, { Component } from 'react';

export default class ChatBar extends Component {
    render () {
        const currentUser = this.props.currentUser
        return (
            <footer className="chatbar">
              <input className="chatbar-username" defaultValue={ currentUser.name } placeholder="Your Name (Optional)" />
              <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}