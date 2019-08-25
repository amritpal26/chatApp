import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import './index.css';
import LoginPage from './containers/LoginPage/LoginPage';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducers/chatApp';
import { BrowserRouter, Route } from 'react-router-dom'

import Messenger from './containers/Messenger/Messenger';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
    <Provider store={store}>
        <BrowserRouter>    
            <Route exact path="/" component={ LoginPage } />
            <Route path='/chats' component={ Messenger } />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
