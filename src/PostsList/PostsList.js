import React from 'react';
import Post from '../Post/Post';
import styles from './PostsList.module.scss';
import firebase from 'firebase';

class PostsList extends React.Component {
  deletePost = async (id) => {
    const db = firebase.firestore();
    const res = await db
      .collection('wpisy')
      .doc(id)
      .delete();
    this.props.refresh();
  };

  render() {
    return (
      <div className={styles.listWrapper}>
        <ul className={styles.postsList}>
          {this.props.list.map((e, index) => (
            <Post
              date={e.data.date}
              content={e.data.content}
              author={e.data.authorName}
              authorMail={e.data.authorMail}
              localization={e.data.localization}
              id={e.id}
              key={index}
              userMail={this.props.userMail}
              displayName={this.props.displayName}
              deletePost={this.deletePost}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default PostsList;
