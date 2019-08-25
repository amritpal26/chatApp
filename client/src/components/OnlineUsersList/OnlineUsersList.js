import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserListItem from './../../components/UsersListItem/UsersListItem'
import './OnlineUsersList.css'
import Toolbar from './../Toolbar/Toolbar'

class OnlineUsersList extends Component {
    
    listItemClicked(receiver){
        this.props.changeReceiver(receiver)
    }

    render(){
        return(
            <div className='users-container'>
                <Toolbar title={'Online Users'} />
                <div className='users-list-parent'>
                    <div className='users-list'>
                    {this.props.loggedInUsers.map(user => (
                        <UserListItem user={ user } onClick={ () => {this.listItemClicked(user)} } key={user.socketId} />
                    ))}
                    </div>
                </div>        
            </div>
        );}
}

const mapStateToProps = (state, props) => {
    return { currentUser: state.users.currentUser,
        loggedInUsers: state.users.loggedInUsers
    }
}

export default connect(mapStateToProps, null)(OnlineUsersList);