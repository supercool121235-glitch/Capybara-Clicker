
import React from 'react';

interface CapybaraProps {
  onClick: (x: number, y: number) => void;
}

const Capybara: React.FC<CapybaraProps> = ({ onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    onClick(e.clientX, e.clientY);
  };

  // The high-quality asset requested by the user
  const CAPY_URL = "https://i.ibb.co/9mYcHfXR/capy.png";

  return (
    <div 
      className="relative cursor-pointer group flex flex-col items-center"
      onClick={handleClick}
    >
      <div className="capy-bounce transition-transform duration-75 active:scale-95">
        <img 
          src={CAPY_URL} 
          alt="Clickable Capybara"
          className="w-72 h-72 object-contain drop-shadow-2xl hover:brightness-105 transition-all select-none pointer-events-none"
        />
      </div>
      
      {/* Decorative grass/ground */}
      <div className="w-64 h-8 bg-emerald-600/20 rounded-[100%] blur-lg -mt-8 -z-10"></div>
      <div className="mt-4 text-emerald-800/40 font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
        Click the Capy!
      </div>
    </div>
  );
};

export default Capybara;
