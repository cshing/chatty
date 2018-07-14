import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: '',
      userColor: ''
    }
    this.addMessage = this.addMessage.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  addMessage(content) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: content
    }
      this.socket.send(JSON.stringify(newMessage));
  }

  setUser(newUser) {
    if (this.state.currentUser.name === '' || this.state.currentUser.name === newUser.name) {
      this.setState({currentUser: newUser})
    } else {
      const newNotification = {
        type: 'postNotification',
        notification: `${this.state.currentUser.name} has changed their name to ${newUser.name}.`
      }
      this.socket.send(JSON.stringify(newNotification));
      this.setState({currentUser: newUser})
    }
  }

  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages })
    }, 3000);

    // Set up new websocket. Users under same WIFI network may enter same chatroom using my IP address
    this.socket = new WebSocket(`ws://${window.location.hostname}:3001`); 
    console.log('Connected to server')

    this.socket.onmessage = (event) => {
      const incomingData = JSON.parse(event.data);

      switch(incomingData.type) {
        // code to handle incoming message
        case 'incomingMessage': {
          const message = {
            id: incomingData.id,
            username: incomingData.username,
            content: incomingData.content,
            userColor: incomingData.userColor
          };
          const messages = this.state.messages.concat(message);
          this.setState({ messages })
          break;
        }

        // code to handle incoming notification
        case 'incomingNotification': {
          const notification = {
            id: incomingData.id,
            username: incomingData.username,
            notification: incomingData.notification,
            userColor: incomingData.userColor
          };
          const messages = this.state.messages.concat(notification);
          this.setState({ messages })
          break;
        }

        // code to handle incoming userCount
        case 'incomingCount': {
          const userCount = incomingData.userCount;
          this.setState({ userCount })
          break;
        }
        
        default:
        // show an error in the console if the message type is unknown
        throw new Error('Unknown event type ' + incomingData.type);
      }
    }
  }

  render () {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-userCount"> {this.state.userCount} user(s) online</span>
        </nav>
  
        <MessageList messages={ this.state.messages } userColor={ this.state.userColor } /> 
        <ChatBar currentUser={ this.state.currentUser } setUser={ this.setUser } addMessage={ this.addMessage } />
      </div>
    );
  }
}