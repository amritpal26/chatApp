import React, { Component } from 'react';
import chatLogo from '../../assets/chatLogo.png';
import './AppHeader.css'; 

export default class AppHeader extends Component {
  render() {
    return(
      <div id="Header">
        <img src={chatLogo} id="Chat-header-logo" alt="logo" />
        <div id='Chat-header-heading'>Chat App</div>
      </div>
    );
  }
}