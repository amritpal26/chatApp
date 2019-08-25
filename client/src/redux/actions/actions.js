export const addNewUser = (newUser) => ({
    type: 'ADD_NEW_USER',
    newUser
})

export const addLoggedInUsers = (loggedInUsers) => ({
    type: 'ADD_LOGGED_IN_USERS',
    loggedInUsers
})

export const removeUser = (user) => ({
    type: 'REMOVE_USER',
    user
})

export const login = (user) => ({
    type: 'LOGIN',
    user
})

export const newMessage = (message, userSocketId) => ({
    type: 'NEW_MESSAGE',
    message,
    userSocketId
})

export const changeReceiver = (receiver) => ({
    type: 'NEW_RECEIVER',
    receiver
})