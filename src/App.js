import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


var config = {
  apiKey: "AIzaSyChxXvaAJjCj8nM-Q4q7qK8xQxnYwVLeNc",
  authDomain: "bloc-chat-react-e1c2c.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-e1c2c.firebaseio.com",
  projectId: "bloc-chat-react-e1c2c",
  storageBucket: "bloc-chat-react-e1c2c.appspot.com",
  messagingSenderId: "922282830626"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoomRef: {key: 'Default'},
      user: ''
    }
  }




  handleRoomChange(activeKey){
    const newActiveRoomRef = firebase.database().ref(activeKey);
    this.setState({ activeRoomRef: newActiveRoomRef });
  }


  setUser(user) {
    this.setState({user: user})
  }




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Chat Room</h1>
          <User firebase={firebase} user={this.state.user} setUser={(user) => this.setUser(user)}/>
        </header>

        <main>
          <MessageList firebase={firebase} user={this.state.user} activeRoomRef={this.state.activeRoomRef} />
        </main>

        <aside>
          <br/>
          <h3>Click on a room to see messages</h3>
          <RoomList firebase={firebase} activeRoomRef={this.state.activeRoomRef} handleRoomChange={(aKey) => this.handleRoomChange(aKey)} />
        </aside>
      </div>
    );
  }
}

export default App;
