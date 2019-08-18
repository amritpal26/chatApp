import React, { Component } from 'react';
import chatLogo from '../assets/chatLogo.png';
import '../styles/Header.css'; 

export default class Header extends Component {
  render() {
    return(
      <div id="Header">
        <img src={chatLogo} id="Chat-header-logo" alt="logo" />
        <text id='Chat-header-heading'>Chat App</text>
      </div>
    );
  }
}