import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state={
      messages:[],
      activeRoomTitle: '',
      nextMessage: ''
    };
    this.messagesRef=this.props.firebase.database().ref('messages');
  }


  componentDidMount() {
    this.messagesRef.orderByChild("sentAt").on("child_added", snapshot => {
      const message = snapshot.val();
      this.setState(state => ({ messages: this.state.messages.concat(message) }));
      }
    );
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if ((this.props.activeRoomRef.key !== "Default") && (this.props.activeRoomRef.key !== prevProps.activeRoomRef.key)) {
      this.props.firebase.database().ref('rooms').once("value", snapshot => {
        const roomTitle = snapshot.child(this.props.activeRoomRef.key).val().name;
        this.setState({activeRoomTitle: roomTitle});
      })
    }
  }


  displayRoomTitle() {
    const activeRoomTitle = this.state.activeRoomTitle;
    const roomTitle = activeRoomTitle !== '' ? activeRoomTitle : '';
    const titleLabel = activeRoomTitle !== '' ? 'Title: ' : '';
    return (titleLabel + roomTitle)
  }


  handleTextChange(e) {
    this.setState({ nextMessage: e.target.value })
  }

  createMessage(e) {
    e.preventDefault();
    if (!this.state.nextMessage) { return }
    const nextMessageEntry = this.state.nextMessage;
    this.setState({ nextMessage: '' });
    this.messagesRef.push({
      'content': nextMessageEntry,
      'roomId': this.props.activeRoomRef.key,
      'sentAt':this.props.firebase.database.ServerValue.TIMESTAMP,
      'username':this.props.user.displayName
    });
  }


  showForm() {
    return (

      <form onSubmit={(e) => this.createMessage(e)}>
        <div>
          <label htmlFor="name">Message</label>
          <input type="text" name="name" value={ this.state.nextMessage } onChange={ (e) => this.handleTextChange(e)} />
        </div>
        <div>
          <input type="submit" value="Send"/>
        </div>
      </form>


    )
  }


  render() {


    return(
      <div>
        <div>
          {this.displayRoomTitle()}
        </div>

        <div>
          {((this.props.activeRoomRef.key !== 'Default') && (this.props.user)) ? this.showForm() : ''}
        </div>

        <div>
          {this.state.messages.filter( message => message.roomId === this.props.activeRoomRef.key).map( (messageEntry, index) =>
            <div key={index}>{messageEntry.content}</div> )}
        </div>
      </div>
    )
  }
}


export default MessageList;
