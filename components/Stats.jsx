
import React from 'react';

const Stats = ({ coins, level, xp, xpNext, cpc, cps, theme }) => {
  const xpPercentage = Math.min(100, (xp / xpNext) * 100);
  const accentColor = theme.accent;
  const textColor = theme.text;

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className={`text-sm font-bold opacity-60 uppercase tracking-widest text-${textColor}`}>CapyCoins</span>
          <h1 className={`text-5xl font-black text-${textColor} drop-shadow-md`}>
            {Math.floor(coins).toLocaleString()}
          </h1>
        </div>
        <div className="text-right">
          <div className={`text-${textColor} font-bold text-xl`}>Level {level}</div>
          <div className={`w-48 h-3 bg-${accentColor}-900/20 rounded-full mt-2 overflow-hidden border border-${accentColor}-300/30 backdrop-blur-md`}>
            <div 
              className={`h-full bg-${accentColor}-500 transition-all duration-300 ease-out`} 
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
          <div className={`text-[10px] opacity-70 mt-1 uppercase font-bold text-${textColor}`}>
            XP: {Math.floor(xp).toLocaleString()} / {xpNext.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-md">
          <div className={`text-xs font-bold opacity-70 uppercase text-${textColor}`}>Coins Per Click</div>
          <div className={`text-xl font-bold text-${textColor}`}>+{Math.floor(cpc).toLocaleString()}</div>
        </div>
        <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-md">
          <div className={`text-xs font-bold opacity-70 uppercase text-${textColor}`}>Coins Per Second</div>
          <div className={`text-xl font-bold text-${textColor}`}>{Math.floor(cps).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;