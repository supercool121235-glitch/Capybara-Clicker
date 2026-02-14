
import React from 'react';

const Stats = ({ coins, level, xp, xpNext, cpc, cps, theme }) => {
  const xpPercentage = Math.min(100, (xp / xpNext) * 100);
  const accentColor = theme.accent;
  const textColor = theme.text;

  return React.createElement('div', { className: "flex flex-col gap-6 w-full max-w-2xl mx-auto" },
    React.createElement('div', { className: "flex justify-between items-end" },
      React.createElement('div', { className: "flex flex-col" },
        React.createElement('span', { className: `text-sm font-bold opacity-60 uppercase tracking-widest text-${textColor}` }, "CapyCoins"),
        React.createElement('h1', { className: `text-5xl font-black text-${textColor} drop-shadow-md` }, 
          Math.floor(coins).toLocaleString()
        )
      ),
      React.createElement('div', { className: "text-right" },
        React.createElement('div', { className: `text-${textColor} font-bold text-xl` }, `Level ${level}`),
        React.createElement('div', { 
          className: `w-48 h-3 bg-${accentColor}-900/20 rounded-full mt-2 overflow-hidden border border-${accentColor}-300/30 backdrop-blur-md` 
        },
          React.createElement('div', { 
            className: `h-full bg-${accentColor}-500 transition-all duration-300 ease-out`, 
            style: { width: `${xpPercentage}%` } 
          })
        ),
        React.createElement('div', { className: `text-[10px] opacity-70 mt-1 uppercase font-bold text-${textColor}` }, 
          `XP: ${Math.floor(xp).toLocaleString()} / ${xpNext.toLocaleString()}`
        )
      )
    ),
    React.createElement('div', { className: "grid grid-cols-2 gap-4" },
      React.createElement('div', { className: "bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-md" },
        React.createElement('div', { className: `text-xs font-bold opacity-70 uppercase text-${textColor}` }, "Coins Per Click"),
        React.createElement('div', { className: `text-xl font-bold text-${textColor}` }, `+${Math.floor(cpc).toLocaleString()}`)
      ),
      React.createElement('div', { className: "bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-md" },
        React.createElement('div', { className: `text-xs font-bold opacity-70 uppercase text-${textColor}` }, "Coins Per Second"),
        React.createElement('div', { className: `text-xl font-bold text-${textColor}` }, Math.floor(cps).toLocaleString())
      )
    )
  );
};

export default Stats;
