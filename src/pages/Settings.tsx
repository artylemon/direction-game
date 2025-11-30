import { Link } from 'react-router-dom';

export const Settings = () => {
  return (
    <div className="p-4">
      <h1>Settings</h1>
      <p>Options will go here.</p>
      <Link to="/" className="text-blue-500 hover:underline mt-4 block">Back to Menu</Link>
    </div>
  );
};
