import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clsx from 'clsx';

const TIME_OPTIONS = [15, 30, 60];

export const Home = () => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(60);

  const handleStartGame = () => {
    navigate('/game', { state: { initialTime: selectedTime } });
  };

  return (
    <div className="p-4 flex flex-col items-center max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Direction Game</h1>
      
      <div className="w-full bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Duration</h2>
        <div className="flex gap-4 justify-center mb-6">
          {TIME_OPTIONS.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={clsx(
                "px-4 py-2 rounded-full font-medium transition-colors",
                selectedTime === time 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {time}s
            </button>
          ))}
        </div>

        <button 
          onClick={handleStartGame}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors shadow-lg transform active:scale-95"
        >
          Start Game
        </button>
      </div>

      <nav className="flex flex-col gap-4 w-full">
        <Link 
          to="/settings" 
          className="text-center p-3 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors"
        >
          Settings
        </Link>
      </nav>
    </div>
  );
};
