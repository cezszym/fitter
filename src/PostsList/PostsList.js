import React from 'react';
import Post from '../Post/Post';
import styles from './PostsList.module.scss';

class PostsList extends React.Component {
  render() {
    return (
      <div className={styles.listWrapper}>
        <ul className={styles.postsList}>
          {this.props.list.map((e, index) => (
            <Post
              date={e.data.date}
              content={e.data.content}
              id={e.id}
              key={index}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default PostsList;
