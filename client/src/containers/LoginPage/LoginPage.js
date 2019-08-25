import React, { Component } from 'react';
import { connect } from 'react-redux';
import chatLogo from './../../assets/chatLogo.png'
import './LoginPage.css';
import socket from '../../utils/socket';
import { ClipLoader } from 'react-spinners';

import {login, addLoggedInUsers} from './../../redux/actions/actions'

class LoginPage extends Component{

    state={
        nickname: '',
        loading: false,
        warningMessage: ' '
    }

    componentWillMount() {
        document.title = 'Chat App'
    }

    componentDidMount() {
        this.addEnterButtonToInput()
        this.getServerResponse();
    }

    onJoinClicked = () => {
        if(this.state.nickname.length <= 0){
            this.setState({warningMessage: 'Enter nickname' })
        }else{
            this.setState({loading: true, warningMessage: ' '})
            socket.emit('join_user', { nickname: this.state.nickname})
        }
    }

    onNicknameChange = () => {
        var value = document.getElementById('nickname_input').value
        this.setState({ nickname: value, nicknameTaken: false})
    }

    addEnterButtonToInput = () => {
        var input = document.getElementById('nickname_input')
        input.addEventListener('keyup', (event) => {
        if (event.keyCode === 13)
            document.getElementById('join_button').click()
        })
    }

    getServerResponse() {
		socket.on('user_joined', (data) => {
            this.props.dispatch(login(data.onlineUser))
            this.props.dispatch(addLoggedInUsers(data.onlineUsers))
            this.setState({nickname: data.onlineUser.nickname, nicknameTaken: false, loading: false})
            this.props.history.push('/chats')
        });
        socket.on('nickname_taken', () => {
            this.setState({warningMessage: 'Nickname taken', loading: false})
        })
	}

    render(){
        const loading = this.state.loading
        const warningMessage = this.state.warningMessage
        return (
            <div className="App">
                <div className='login-page-container'>
                    <div className='Chat-heading'>Chat App</div>
                    <img src={chatLogo} className="Chat-logo" alt="logo" />
                    <div>
                        <input id='nickname_input' placeholder='nickname' onChange={this.onNicknameChange}></input>
                        <button id='join_button' className='button' onClick={ this.onJoinClicked } disabled={loading}>
                            { loading && <ClipLoader sizeUnit={"px"} size={20} color={'#000'} loading={this.state.loading}/> }
                            { !loading && <span>Join</span> }
                        </button>
                    </div>
                    <div className='danger-text' >{warningMessage}</div>
                </div>
            </div>
                
        );
    }
}

const mapStateToProps = (state, props) => {
    return { currentUser: state.currentUser,
        loggedInUsers: state.loggedInUsers
    }
}

export default connect(mapStateToProps, null)(LoginPage)
