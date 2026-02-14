
import React from 'react';

const Capybara = ({ onClick }) => {
  const handleClick = (e) => {
    onClick(e.clientX, e.clientY);
  };

  const CAPY_URL = "https://i.ibb.co/9mYcHfXR/capy.png";

  return React.createElement('div', { 
    className: "relative cursor-pointer group flex flex-col items-center",
    onClick: handleClick
  },
    React.createElement('div', { className: "capy-bounce transition-transform duration-75 active:scale-95" },
      React.createElement('img', { 
        src: CAPY_URL, 
        alt: "Clickable Capybara",
        className: "w-72 h-72 object-contain drop-shadow-2xl hover:brightness-105 transition-all select-none pointer-events-none"
      })
    ),
    React.createElement('div', { className: "w-64 h-8 bg-emerald-600/20 rounded-[100%] blur-lg -mt-8 -z-10" }),
    React.createElement('div', { 
      className: "mt-4 text-emerald-800/40 font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest" 
    }, "Click the Capy!")
  );
};

export default Capybara;
