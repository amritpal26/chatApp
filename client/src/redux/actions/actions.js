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

export const login = (currentUser) => ({
    type: 'LOGIN',
    currentUser
})