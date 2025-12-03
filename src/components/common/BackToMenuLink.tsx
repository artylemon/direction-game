import { Link } from 'react-router-dom';

interface BackToMenuLinkProps {
  className?: string;
}

export const BackToMenuLink = ({ className = '' }: BackToMenuLinkProps) => {
  return (
    <Link 
      to="/"  
      className={`px-6 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors font-medium text-sm ${className}`}
    >
      Back to Menu
    </Link>
  );
};
