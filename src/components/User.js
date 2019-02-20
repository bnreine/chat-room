import React, { Component } from 'react';

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    })
  }



  handleSignIn(e) {
    e.preventDefault();
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOut(e) {
    e.preventDefault();
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <div id="userAuthentication">
        <button id="signIn" onClick={(e) => this.handleSignIn(e) }>Sign In</button>
        <button id ="signOut" onClick={(e) => this.handleSignOut(e) }>Sign Out</button>
        <div id="userName">Current User: {this.props.user ? this.props.user.displayName : 'Guest'}</div>
      </div>
    )
  }

}

export default User;
