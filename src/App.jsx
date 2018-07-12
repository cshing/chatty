import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        // {
        //   id: '',
        //   username: '',
        //   content: '',
        // },
      ],
      notification: '',
      userCount: ''
    }
    this.setUser = this.setUser.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  setUser(newUser) {
    if (this.state.currentUser.name === '' || this.state.currentUser.name === newUser) {
      this.setState({currentUser: newUser})
    } else {
      const newNotification = {
        type: 'postNotification',
        content: `${this.state.currentUser.name} has changed their name to ${newUser.name}.`
      }
      this.socket.send(JSON.stringify(newNotification));
      this.setState({currentUser: newUser})
    }
  }

  addMessage(content) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: content
    }
      this.socket.send(JSON.stringify(newMessage));
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

    this.socket = new WebSocket(`ws://${window.location.hostname}:3001`); 
    console.log('Connected to server')

    this.socket.onmessage = (event) => {

      const incomingData = JSON.parse(event.data);
      switch(incomingData.type) {
        case 'incomingMessage': {
          // code to handle incoming message
          const message = {
            id: incomingData.id,
            username: incomingData.username,
            content: incomingData.content
          }
          const messages = this.state.messages.concat(message);
          this.setState({ messages })
          break;
        }

        case 'incomingNotification': {
          // code to handle incoming notification
          const notification = incomingData.content;
          this.setState({ notification })
          break;
        }

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
          <span className="userCount"> {this.state.userCount} user(s) online</span>
        </nav>
  
        <MessageList messages={ this.state.messages } notification={ this.state.notification }  />
        <ChatBar currentUser={ this.state.currentUser } setUser={ this.setUser } addMessage={ this.addMessage } />
  
      </div>
    );
  }
}