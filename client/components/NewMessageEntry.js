import React, { Component } from 'react';
import store, {writeMessage, gotNewMessageFromServer} from '../store';
import axios from 'axios';


export default class NewMessageEntry extends Component {
  constructor (props) {
    super(props);
    this.state = store.getState();

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
  }

  componentDidMount () {
      this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  handleChangeInput (evt) {
    const action = writeMessage(evt.target.value);
    store.dispatch(action);
  }

  handleSubmitMessage (evt) {
    evt.preventDefault();
    const channelId = this.props.channelId;
    const content = this.state.newMessageEntry;
    axios.post('/api/messages', {
      channelId,
      content
    })
    .then(res => res.data)
    .then(message => {
      store.dispatch(gotNewMessageFromServer(message));
    })

  }

  render () {
    return (
      <form id="new-message-form" onSubmit = {this.handleSubmitMessage}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            onChange = {this.handleChangeInput}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
