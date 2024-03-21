import React from 'react';
import styles from '../styles/modules/title.module.scss';

function PageTitle({ children, ...rest }) {
  return (
    <p className={styles.title} {...rest}>
      {children}
    </p>
  );
}

function Subtitle({ children, ...rest }) {
  return (
    <p className={styles.subtitle} {...rest}>
      {children}
    </p>
  );
}

function Name({ children, ...rest }) {
  return (
    <p className={styles.name} {...rest}>
      {children}
    </p>
  );
}

export { PageTitle, Subtitle, Name };
