import React from 'react';
import styles from './Post.module.scss';
import firebase from 'firebase';

class Post extends React.Component {
  constructor(props) {
    super();
    this.state = {
      comments: [],
      commentsOpened: false,
      newComment: '',
      currentUser: props.user,
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
        author: this.props.user.displayName,
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
          <p className={styles.date}>
            {this.props.date
              ? this.props.date.toDate().toDateString()
              : 'no date'}
          </p>
          {this.props.author ? this.props.author + ' said:' : 'No user'}
          <p className={styles.content}>
            {this.props.content ? this.props.content : 'no content'}
          </p>
        </div>
        {!this.state.commentsOpened && (
          <button onClick={this.fetchComments} className="baseButton">
            Show comments
          </button>
        )}
        {this.state.commentsOpened && (
          <div className={styles.comments}>
            <p className={styles.label}>Comments</p>
            <ul>
              {this.state.comments.length ? (
                this.state.comments.map((c, index) => (
                  <li key={index}>
                    {c.author && (
                      <p className={styles.commentAuthor}>
                        {' '}
                        {c.author} commented:
                      </p>
                    )}
                    <p className={styles.comment}>{c.content}</p>
                  </li>
                ))
              ) : (
                <li>
                  <p className={styles.comment}>Be first person to comment</p>
                </li>
              )}
            </ul>
            {this.props.user && (
              <form onSubmit={this.addComment} className={styles.form}>
                <input
                  className={styles.commentInput}
                  onChange={this.updateInput}
                  type="text"
                  name="newComment"
                  placeholder="Type your comment ..."
                  value={this.state.newComment}
                  required
                />
                <button className="baseButton" type="submit">
                  Add comment
                </button>
              </form>
            )}
          </div>
        )}
      </li>
    );
  }
}

export default Post;
