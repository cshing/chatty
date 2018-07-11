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
    this.addMessage = this.addMessage.bind(this);
  }

  generateRandId() {
    let randId = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) 
      randId += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return randId;
  }

  addMessage(event) {
    const newMessage = 
        [{
          id: this.generateRandId(),
          username: this.state.currentUser.name,
          content: event.target.value
        }]
    const messages = this.state.messages.concat(newMessage)
    if (event.key === 'Enter') {
      this.setState({ messages: messages }, event.target.value='');
    }
  }

  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render () {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
  
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser } addMessage={ this.addMessage } />
  
      </div>
    );
  }
}