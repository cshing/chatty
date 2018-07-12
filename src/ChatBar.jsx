import React, { Component } from 'react';

export default class ChatBar extends Component {

    constructor(props) {
        super(props);
        this.onBlurUsername = this.onBlurUsername.bind(this);
        this.onEnterContent = this.onEnterContent.bind(this);
    }
    
    onBlurUsername(event) {
        const newUser = {name: (event.target.value.length !== 0) ? event.target.value : 'Anonymous' };
        this.props.setUser(newUser);
    }

    onEnterContent(event) {
        if (event.key === 'Enter') {
            const content = event.target.value;
            this.props.addMessage(content);
            event.target.value = '';
        }
    }

    ComponentDidMount() {
        this.currentUser.focus();
    }

    render () {
        const { currentUser } = this.props;

        return (
            <footer className="chatbar">
              <input className="chatbar-username" autoFocus defaultValue={ currentUser.name } onBlur={ this.onBlurUsername } placeholder="Your Name (Optional)" />
              <input className="chatbar-message" onKeyPress={ this.onEnterContent } placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}