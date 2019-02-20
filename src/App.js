import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import Header from './components/Header';


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
        <Header user={this.state.user} firebase={firebase} setUser={(user) => this.setUser(user)}/>


        <div id="mainWindow">
          <aside id="aside">
            <br/>
            <h3>Click on a room to see messages</h3>
            <RoomList firebase={firebase} activeRoomRef={this.state.activeRoomRef} handleRoomChange={(aKey) => this.handleRoomChange(aKey)} />
          </aside>

          <main id="main">
            <MessageList firebase={firebase} user={this.state.user} activeRoomRef={this.state.activeRoomRef} />
          </main>
        </div>

      </div>
    );
  }
}

export default App;
