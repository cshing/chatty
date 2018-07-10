import React, { Component } from 'react';

export default class ChatBar extends Component {
    render () {
        const { currentUser, onEnter } = this.props;

        return (
            <footer className="chatbar">
              <input className="chatbar-username" defaultValue={ currentUser.name } placeholder="Your Name (Optional)" />
              <input className="chatbar-message" onKeyPress={ onEnter } placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}