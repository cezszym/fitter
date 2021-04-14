import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';

const Header = () => (
  <header>
    <div className={styles.wrapper}>
      <h1>
        <FontAwesomeIcon className={styles.icon} icon={['fas', 'running']} />{' '}
        Fitter
      </h1>
    </div>
  </header>
);

export default Header;
