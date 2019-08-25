import React from 'react';

import './UserListItem.css'

export default function UserListItem(props){
    return(
        <div className='user-list-item-container' onClick={ props.onClick }>
            <div>{ props.user.nickname }</div>
        </div> 
    );
}