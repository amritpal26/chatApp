import {combineReducers} from 'redux';
import users from './users';
import chats from './chats';

export default combineReducers({
    users,
    chats
})