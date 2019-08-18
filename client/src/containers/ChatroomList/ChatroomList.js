import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LoginPage.css';

class ChatroomList extends Component{

    componentWillMount() {
        document.title = 'Chat App'
    }
    
    render(){
        return (
            <div className="App-header">
        
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return { currentUser: state.currentUser,
        loggedInUsers: state.loggedInUsers
    }
}

export default connect(mapStateToProps, null)(ChatroomList)
