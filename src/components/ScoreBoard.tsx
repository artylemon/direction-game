import clsx from 'clsx';
import styles from './ScoreBoard.module.css';

interface ScoreBoardProps {
  score: number;
  timeLeft: number;
}

export const ScoreBoard = ({ score, timeLeft }: ScoreBoardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.score}>Score: {score}</div>
      <div className={clsx(styles.timer, { [styles.timerLow]: timeLeft <= 10 })}>
        Time: {timeLeft}s
      </div>
    </div>
  );
};
