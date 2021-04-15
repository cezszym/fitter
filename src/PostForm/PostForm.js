import React from 'react';
import firebase from '../Firebase/Firebase';
import styles from './PostForm.module.scss';

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
      authorName: this.props.user.displayName,
      authorMail: this.props.user.email,
    });
    this.props.refresh();
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <form onSubmit={this.addPost} className={styles.form}>
          <textarea
            className={styles.contentTextarea}
            onChange={this.updateInput}
            type="text"
            name="content"
            rows="10"
            placeholder="Tell others about your activity ..."
            value={this.state.content}
            required
          />
          <button className="baseButton" type="submit">
            Add new fitt !
          </button>
        </form>
      </div>
    );
  }
}

export default PostForm;
