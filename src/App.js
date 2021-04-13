import React from 'react';
import PostForm from './PostForm/PostForm';
import PostsList from './PostsList/PostsList';
import firebase from 'firebase';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

  fetchPosts = async () => {
    const db = firebase.firestore();
    const postsRef = db.collection('wpisy');
    const response = await postsRef.orderBy('date', 'desc').get();
    const posts = [];
    response.forEach((doc) => {
      posts.push(doc.data());
    });
    this.setState({ list: posts });
  };

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    return (
      <div className="pageWrapper">
        <header>
          <h1>Fitter</h1>
        </header>
        <PostForm refresh={this.fetchPosts} />
        <PostsList list={this.state.list} />
      </div>
    );
  }
}

export default App;
