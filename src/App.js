import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
  faRunning,
  faTimes,
  faMapMarkerAlt,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import PostForm from './PostForm/PostForm';
import PostsList from './PostsList/PostsList';
import firebase from 'firebase';
import Header from './Header/Header';

library.add(fas, faRunning, faTimes, faMapMarkerAlt, faCopy);

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
        <Header user={this.state.user ? this.state.user.displayName : null} />
        {this.state.user && (
          <PostForm
            displayName={this.state.user ? this.state.user.displayName : null}
            email={this.state.user ? this.state.user.email : null}
            refresh={this.fetchPosts}
          />
        )}
        <PostsList
          displayName={this.state.user ? this.state.user.displayName : null}
          userMail={this.state.user ? this.state.user.email : null}
          list={this.state.list}
          refresh={this.fetchPosts}
        />
      </div>
    );
  }
}

export default App;
