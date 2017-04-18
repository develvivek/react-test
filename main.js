import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import {applyMiddleware,createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducer';

const initialState = {
        allShows : [],
        favouriteShows : [],
        selectedItem: {}
    },
    middleware = applyMiddleware(logger, thunk);


const store = createStore(reducer, initialState, middleware);

store.subscribe(() => {
    // console.log("Store Changed", store.getState());
});

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById('app')
);