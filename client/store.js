import {createStore} from 'redux';//action - typeconst GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';const initialState = {    messages: []};//actionexport function gotMessagesFromServer(messages) {    return {        type: GOT_MESSAGES_FROM_SERVER,        messages    };};// reducer functionexport function reducer(prevState = initialState, action) {    switch (action.type) {        case GOT_MESSAGES_FROM_SERVER:            return Object.assign({}, prevState, {                messages: action.messages            });        default:            return prevState;    }};const store = createStore(reducer);export default store;