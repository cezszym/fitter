import React from 'react';
import styles from './Post.module.scss';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Post extends React.Component {
  constructor(props) {
    super();
    this.state = {
      comments: [],
      commentsOpened: false,
      newComment: '',
    };
  }

  delete = () => {
    if (window.confirm('Are you sure you want to delete this fitt?')) {
      this.props.deletePost(this.props.id);
    }
  };

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
        author: this.props.displayName,
        date: now,
      });
    this.fetchComments();
  };

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  copyText = () => {
    navigator.clipboard.writeText(this.props.content);
    alert('Fitt was copied');
  };

  render() {
    return (
      <li className={styles.wrapper}>
        <div className={styles.post}>
          {this.props.authorMail === this.props.userMail && (
            <div className={styles.deleteBtn}>
              <p onClick={this.delete}>Delete</p>
            </div>
          )}
          <div className={styles.additionalInfo}>
            <p>
              {this.props.date
                ? this.props.date.toDate().toDateString()
                : 'no date'}
            </p>
            {this.props.localization && (
              <p className={styles.localization}>{this.props.localization}</p>
            )}
          </div>
          {this.props.author ? this.props.author + ' said:' : 'No user'}
          <p className={styles.content}>
            {this.props.content ? this.props.content : 'no content'}
          </p>
        </div>
        <div onClick={this.copyText} className={styles.copyIcon}>
          <FontAwesomeIcon className={styles.icon} icon={['fas', 'copy']} />
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
            {this.props.userMail && (
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
