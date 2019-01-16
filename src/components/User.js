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
      <div>
        <button onClick={(e) => this.handleSignIn(e) }>Sign In</button>
        <button onClick={(e) => this.handleSignOut(e) }>Sign Out</button>
        <div>{this.props.user ? this.props.user.displayName : ''}</div>
      </div>
    )
  }

}

export default User;
