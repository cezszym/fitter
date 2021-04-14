import React from 'react';
import styles from './Post.module.scss';
import firebase from 'firebase';

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      commentsOpened: false,
      newComment: '',
    };
  }

  fetchComments = async () => {
    const db = firebase.firestore();
    const commentsRef = db
      .collection('wpisy')
      .doc(this.props.id)
      .collection('komentarze');
    const response = await commentsRef.orderBy('date').get();
    const comments = [];
    response.forEach((doc) => {
      comments.push(doc.data());
    });
    this.setState({ comments: comments, commentsOpened: true });
  };

  addComment = (e) => {
    e.preventDefault();
    this.setState({
      newComment: '',
    });
    const now = new Date();
    const db = firebase.firestore();
    const postRef = db
      .collection('wpisy')
      .doc(this.props.id)
      .collection('komentarze')
      .add({
        content: this.state.newComment,
        date: now,
      });
    this.fetchComments();
  };

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <li className={styles.wrapper}>
        <div className={styles.post}>
          <p>
            {this.props.date
              ? this.props.date.toDate().toDateString()
              : 'no date'}
          </p>
          <p className={styles.content}>
            {this.props.content ? this.props.content : 'no content'}
          </p>
        </div>
        {!this.state.commentsOpened && (
          <button onClick={this.fetchComments} className="baseButton">
            Zobacz komentarze
          </button>
        )}
        {this.state.commentsOpened && (
          <div className={styles.comments}>
            <p className={styles.label}>Komentarze:</p>
            <ul>
              {this.state.comments.length ? (
                this.state.comments.map((c, index) => (
                  <li key={index}>
                    <p className={styles.comment}>{c.content}</p>
                  </li>
                ))
              ) : (
                <li>
                  <p className={styles.comment}>
                    Bądź pierwszą osobą która skomentuje
                  </p>
                </li>
              )}
            </ul>
            <form onSubmit={this.addComment} className={styles.form}>
              <input
                className={styles.commentInput}
                onChange={this.updateInput}
                type="text"
                name="newComment"
                placeholder="Napisz komentarz ..."
                value={this.state.newComment}
              />
              <button className="baseButton" type="submit">
                Dodaj komentarz
              </button>
            </form>
          </div>
        )}
      </li>
    );
  }
}

export default Post;
