import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeReceiver, newMessage, addNewUser, removeUser } from '../../redux/actions/actions'
import socket from '../../utils/socket'
import AppHeader from '../../components/AppHeader/AppHeader'
import OnlineUsersList from '../../components/OnlineUsersList/OnlineUsersList'
import MessagesList from '../../components/MessagesList/MessagesList'
import './Messenger.css'

class Messenger extends Component{

    componentDidMount(){
        this.listenToMessages()
        this.listenToUsersChanged();
    }

    componentWillMount() {
        document.title = 'Chat App'
        if(this.props.user.socketId === ''){
            socket.emit('disconnect')
            this.logout();
        }
    }

    changeReceiver = (receiver) => {
        this.props.dispatch(changeReceiver(receiver))
    }

    sendMessage = (text_to_send) => {
        if (this.props.receiverUser != null){
            var packet = {
                receiverId: this.props.receiverUser.socketId, 
                text: text_to_send
            }
            socket.emit('send_private_message', packet)
            let message = {
                text: text_to_send,
                authorId: this.props.user.socketId,
                receiverId: this.props.receiverUser.socketId,
            }
            this.props.dispatch(newMessage(message, this.props.receiverUser.socketId))
        }else{
            console.log('receiver is null')
        }
    }

    listenToMessages = () => {
        socket.on('receive_private_message', (data) => {
            console.log('message received: ' + data)
            let message = {
                text: data.text,
                authorId: data.senderSocketId,
                receiverId: this.props.user.socketId
            }
            this.props.dispatch(newMessage(message, data.senderSocketId))
        });
    } 

    listenToUsersChanged(){
        socket.on('new_online_user', (newUser) => {
            this.props.dispatch(addNewUser(newUser));
        })

        socket.on('user_disconnected', (disconnectedUser) => {
            this.props.dispatch(removeUser(disconnectedUser));
        });
    }

    logout = () => {
        this.listenToUsersChanged = () => {}
        this.listenToMessages = () => {}
        this.props.history.goBack()
    }
    
    render(){
        let currentMessages = []
        if (this.props.receiverUser != null && this.props.chatsCollection[this.props.receiverUser.socketId] != null)
            currentMessages = this.props.chatsCollection[this.props.receiverUser.socketId]

        return (
            <div className="App">
                <AppHeader className='.chat-page-header'/>
                <div className='split-container'>
                    <div className='left-container'>
                        <OnlineUsersList history={this.props.history} 
                            loggedInUsers={ this.props.loggedInUsers }  
                            changeReceiver={ (receiver) => {this.changeReceiver(receiver)} }
                        />
                    </div>
                    <div className='right-container'>
                        <MessagesList sendMessage = { this.sendMessage } 
                            messages={ currentMessages }
                            userSocketID={ this.props.user.socketId }
                            receiverUser={ this.props.receiverUser }/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return { user: state.users.user,
        loggedInUsers: state.users.loggedInUsers,
        receiverUser: state.chats.receiverUser,
        chatsCollection: state.chats.chatsCollection,
    }
}

export default connect(mapStateToProps, null)(Messenger)
