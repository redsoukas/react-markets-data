import styles from "shared/components/loader/loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.ellipsis}><div></div><div></div><div></div><div></div></div>
  );
}
