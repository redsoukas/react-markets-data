import { ReactElement } from 'react';
import styles from 'shared/components/loader/loader.module.scss';

export const Loader = (): ReactElement => {
  return (
    <div className={styles.ellipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
