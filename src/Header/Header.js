import React from 'react';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
    };
  }

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  render() {
    const modalClass = this.state.modalOpen ? styles.visible : styles.hidden;
    return (
      <header>
        <div className={styles.wrapper}>
          <h1 className={styles.pageTitle}>
            <FontAwesomeIcon
              className={styles.icon}
              icon={['fas', 'running']}
            />
            Fitter
          </h1>
          <div className={styles.userInfo}>
            {this.props.user ? (
              <p>Logged as {this.props.user.displayName}</p>
            ) : (
              <p>To post fitts and comment you have to login</p>
            )}
            {this.props.user ? (
              <button className={styles.loginButton} onClick={this.logout}>
                Logout
              </button>
            ) : (
              <button className={styles.loginButton} onClick={this.toggleModal}>
                Login
              </button>
            )}
          </div>
        </div>
        {!this.props.user && (
          <div className={`${styles.loginModal} ${modalClass}`}>
            <FontAwesomeIcon
              onClick={this.toggleModal}
              className={(styles.icon, styles.closeButton)}
              icon={['fas', 'times']}
            />
            <div className="authContainer">
              <div id="firebaseui-auth-container"></div>
            </div>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
