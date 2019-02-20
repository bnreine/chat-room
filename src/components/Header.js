import React, { Component } from 'react';
import User from './User';

class Header extends Component {
  render() {
    return(
      <header className="header">
        <h1 className="title">Chat Room</h1>
        <User firebase={this.props.firebase} user={this.props.user} setUser={this.props.setUser}/>
      </header>
    )
  }
}

export default Header;
