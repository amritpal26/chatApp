const initialState = {
    loggedInUsers: [],
    user: {socketId: ''}
}

const users = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_NEW_USER':
            return {...state,
                loggedInUsers: [...state.loggedInUsers, 
                    { socketId: action.newUser.socketId,
                    nickname: action.newUser.nickname,
                    dob: action.newUser.dob} 
                ]
            }
            
        case 'ADD_LOGGED_IN_USERS': 
            return {...state,
                loggedInUsers: action.loggedInUsers
            }
        
        case 'REMOVE_USER': 
            return {
                ...state,
                loggedInUsers: state.loggedInUsers.filter( user => user.socketId !== action.user.socketId)
            }
        
        case 'LOGIN':
            return {
                ...state,
                user: action.user
            }

        default:
            return state;
    }
}

export default users;