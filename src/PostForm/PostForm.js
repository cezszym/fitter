import React from 'react';
import firebase from '../Firebase/Firebase';
import Geocode from 'react-geocode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PostForm.module.scss';

Geocode.setApiKey('AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU');

class PostForm extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
      localization: '',
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
      localization: '',
    });
    const now = new Date();
    const db = firebase.firestore();
    const postsRef = db.collection('wpisy').add({
      content: this.state.content,
      localization: this.state.localization.length
        ? this.state.localization
        : null,
      date: now,
      authorName: this.props.displayName,
      authorMail: this.props.email,
    });
    this.props.refresh();
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocation);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  setLocation = (position) => {
    const api_url = 'https://api.opencagedata.com/geocode/v1/json';

    const request_url =
      api_url +
      '?' +
      'key=' +
      'f6942d7199cf4c9d95c4116f33603bb7' +
      '&q=' +
      encodeURIComponent(
        position.coords.latitude + ',' + position.coords.longitude
      ) +
      '&pretty=1' +
      '&no_annotations=1';

    const request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    request.onload = () => {
      if (request.status === 200) {
        // Success!
        const data = JSON.parse(request.responseText);
        const city = data.results[0].components.city;
        this.setState({ localization: city });
        console.log(city);
      } else {
        alert('server error');
      }
    };

    request.onerror = function () {
      alert('unable to connect to server');
    };

    request.send();
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
          <div className={styles.location}>
            <input
              className={styles.localizationInput}
              placeholder="Set localization (optional)"
              name="localization"
              value={this.state.localization}
              onChange={this.updateInput}
            />
            <div className={styles.getLocation} onClick={this.getLocation}>
              <FontAwesomeIcon
                className={styles.icon}
                icon={['fas', 'map-marker-alt']}
              />
              <p>Get my location</p>
            </div>
          </div>
          <button className="baseButton" type="submit">
            Add new fitt !
          </button>
        </form>
      </div>
    );
  }
}

export default PostForm;
