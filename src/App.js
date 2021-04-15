import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faRunning, faTimes } from '@fortawesome/free-solid-svg-icons';
import PostForm from './PostForm/PostForm';
import PostsList from './PostsList/PostsList';
import firebase from 'firebase';
import Header from './Header/Header';

library.add(fas, faRunning, faTimes);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      user: null,
    };
  }

  fetchPosts = async () => {
    const db = firebase.firestore();
    const postsRef = db.collection('wpisy');
    const response = await postsRef.orderBy('date', 'desc').get();
    const posts = [];
    response.forEach((doc) => {
      posts.push({ id: doc.id, data: doc.data() });
    });
    this.setState({
      list: posts,
    });
  };

  sayUser = () => {
    console.log(this.state.user);
  };

  componentDidMount() {
    this.fetchPosts();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    return (
      <div className="pageWrapper">
        <Header user={this.state.user} />
        {this.state.user && <PostForm refresh={this.fetchPosts} />}
        <PostsList list={this.state.list} />
      </div>
    );
  }
}

export default App;
