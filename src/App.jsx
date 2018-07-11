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
          id: '',
          username: '',
          content: '',
        },
      ]
    }
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(event) {
    const newMessage = 
        {
          username: this.state.currentUser.name,
          content: event.target.value
        }

    if (event.key === 'Enter') {
      this.socket.send(JSON.stringify(newMessage), event.target.value='');
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

    this.socket = new WebSocket('ws://localhost:3001'); //${window.location.host}
    console.log('Connected to server')

    this.socket.onmessage = (event) => {
      // code to handle incoming message
      const message = JSON.parse(event.data);
      const messages = this.state.messages.concat(message);
      this.setState({ messages })
    }
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