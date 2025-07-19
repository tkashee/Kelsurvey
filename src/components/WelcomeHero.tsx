import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WelcomeHero: React.FC = () => {
  return (
    <section id="home" className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400/5 via-transparent to-purple-400/5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg">
          <Star className="h-3 w-3 mr-1" />
          Trusted by 10,000+ users
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
          Earn From Your
          <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2">
            Valuable Opinions
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Get up to Ksh 300 per survey. Free and easy to join, earn and have fun with quick payouts via M-Pesa.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl text-lg px-8 py-6 transition-all duration-300 transform hover:scale-105">
              Start Earning Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <button 
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700 h-11 rounded-md px-8 text-lg"
          >
            Learn More
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              10K+
            </div>
            <div className="text-gray-600 font-medium">Active Users</div>
          </div>
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              50K+
            </div>
            <div className="text-gray-600 font-medium">Surveys Done</div>
          </div>
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              2M+
            </div>
            <div className="text-gray-600 font-medium">Paid Out</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;
