import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export default class App extends Component {
  //constructor, super, this.state
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 'df3Rf5',
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 'ke97DF',
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
  }

  render () {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
  
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser } />
  
      </div>
    );
  }
}