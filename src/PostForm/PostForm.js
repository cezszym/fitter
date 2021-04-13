import React from 'react';
import firebase from '../Firebase/Firebase';

class PostForm extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
    };
  }

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addPost = (e) => {
    e.preventDefault();
    this.setState({
      content: '',
    });
    const now = new Date();
    const db = firebase.firestore();
    const postsRef = db.collection('wpisy').add({
      content: this.state.content,
      date: now,
    });
    this.props.refresh();
  };

  render() {
    return (
      <form onSubmit={this.addPost}>
        <textarea
          onChange={this.updateInput}
          type="text"
          name="content"
          rows="10"
          placeholder="Pochwal się swoją aktywnością ..."
          value={this.state.content}
        />
        <button type="submit">Dodaj fitta !</button>
      </form>
    );
  }
}

export default PostForm;
