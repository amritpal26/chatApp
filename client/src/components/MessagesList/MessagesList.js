import React, { Component } from 'react';

import './MessagesList.css'
import Message from '../Message/index'
import Toolbar from '../Toolbar/Toolbar'

class MessagesList extends Component {

    componentDidMount(){
        this.addEnterButtonToInput()
    }

    addEnterButtonToInput = () => {
        var input = document.getElementById('message_input')
        input.addEventListener('keyup', (event) => {
        if (event.keyCode === 13)
            document.getElementById('send_button').click()
        })
    }

    send_btn_pressed = () => {
        var input = document.getElementById('message_input');
        var message = input.value;
        if (message !== ''){
          this.props.sendMessage(message)
          input.value = ''
        }
    }

    render(){
        return(
            <div className='current-chat-container'>
                <Toolbar title={ this.props.receiverUser.nickname } />
                
                {this.props.receiverUser.socketId === null && 
                  <div className='no-user-selected-message'>
                    <div className='no-user-selected-message-text'>Please select an online user to chat.</div>
                  </div>
                }
                
                {this.props.receiverUser.socketId != null && 
                  <div className="message-list-container">{this.renderMessages()}</div>
                }
            
                <div className='message-input'>
                    <input id='message_input'/>
                    <button value="Enter" id='send_button' onClick={ this.send_btn_pressed }>Send</button>
                </div>
            </div>
        );
    }


    renderMessages() {
        let i = 0;
        let messageCount = this.props.messages.length;
        let messages = [];
    
        while (i < messageCount) {
          let previous = this.props.messages[i - 1];
          let current = this.props.messages[i];
          let next = this.props.messages[i + 1];
          let isMine = current.authorId === this.props.userSocketID;
          let prevBySameAuthor = false;
          let nextBySameAuthor = false;
          let startsSequence = true;
          let endsSequence = true;
          console.log('isMine: ' + isMine + ', current: ' + current.authorId)
    
          if (previous) {
            prevBySameAuthor = previous.author === current.author;
            
            if (prevBySameAuthor) {
              startsSequence = false;
            }    
          }
    
          if (next) {
            nextBySameAuthor = next.author === current.author;
    
            if (nextBySameAuthor) {
              endsSequence = false;
            }
          }
    
          messages.push(
            <Message
              key={i}
              isMine={isMine}
              startsSequence={startsSequence}
              endsSequence={endsSequence}
              text={current.text}
            />
          );
    
          // Proceed to the next message.
          i += 1;
        }
        console.log('messages: ' + messages.length)
        return messages;
      }
}

export default MessagesList;