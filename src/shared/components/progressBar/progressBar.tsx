import styles from 'shared/components/progressBar/progressBar.module.scss';

export interface ProgressBarProps {
  percentage: number;
}
export const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <div className={styles.progressBar}>
      <div style={{ width: `${percentage}%` }}></div>
    </div>
  );
};
