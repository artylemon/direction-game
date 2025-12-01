import clsx from 'clsx';

interface ScoreBoardProps {
  score: number;
  timeLeft: number;
}

export const ScoreBoard = ({ score, timeLeft }: ScoreBoardProps) => {
  return (
    <div className="flex justify-between w-full max-w-[300px] mb-4 px-4 py-2 bg-gray-100 rounded-lg font-bold">
      <div className="text-blue-600">Score: {score}</div>
      <div className={clsx("text-gray-600", { "text-red-600 animate-pulse": timeLeft <= 10 })}>
        Time: {timeLeft}s
      </div>
    </div>
  );
};
