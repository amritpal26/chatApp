const initialState = {
    chatsCollection: {},
    receiverUser: {nickname: 'Conversation title', socketId: null}
}

const chats = (state = initialState, action) => {
    switch(action.type){     
        case 'NEW_MESSAGE':
            if (state.chatsCollection[action.userSocketId] !== undefined){
                return {...state,
                    chatsCollection: {
                        ...state.chatsCollection,
                        [action.userSocketId]: [...state.chatsCollection[action.userSocketId], action.message]
                    }
                }
            } else {
                return {...state,
                    chatsCollection: {
                        ...state.chatsCollection,
                        [action.userSocketId]: [action.message]
                    }
                }
            }

        case 'NEW_RECEIVER':
            return {
                ...state,
                receiverUser: action.receiver
            }

        default:
            return state;
    }
}

export default chats;