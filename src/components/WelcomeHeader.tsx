import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DollarSign } from 'lucide-react';

interface WelcomeHeaderProps {
  onNavigate: (section: string) => void;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SurveyDash</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => onNavigate('home')} className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">Home</button>
            <button onClick={() => onNavigate('features')} className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">Features</button>
            <button onClick={() => onNavigate('how-it-works')} className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">How It Works</button>
            <button onClick={() => onNavigate('testimonials')} className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">Testimonials</button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WelcomeHeader;
