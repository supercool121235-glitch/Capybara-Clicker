
import React, { useState } from 'react';
import { UpgradeCategory } from '../types.js';
import { COST_GROWTH } from '../constants.js';

const UpgradeList = ({ upgrades, purchased, playerLevel, currentCoins, onBuy, activeTheme }) => {
  const [activeTab, setActiveTab] = useState(UpgradeCategory.CLICK_POWER);

  const categories = Object.values(UpgradeCategory);

  const filteredUpgrades = upgrades.filter(u => u.category === activeTab);

  return React.createElement('div', { className: "flex flex-col h-full" },
    React.createElement('div', { className: "flex flex-wrap gap-1 p-4 bg-white/5 sticky top-0 z-20 border-b border-black/10 backdrop-blur-md" },
      categories.map(cat => 
        React.createElement('button', {
          key: cat,
          onClick: () => setActiveTab(cat),
          className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === cat 
            ? 'bg-emerald-600 text-white shadow-md scale-105' 
            : 'bg-black/10 text-emerald-900 hover:bg-black/20'
          }`
        }, cat)
      )
    ),
    React.createElement('div', { className: "p-4 space-y-3" },
      filteredUpgrades.map(u => {
        const count = purchased[u.id] || 0;
        const cost = Math.floor(u.baseCost * Math.pow(COST_GROWTH, count));
        const isLocked = playerLevel < u.unlockLevel;
        
        const isTheme = u.category === UpgradeCategory.THEMES;
        const isOwned = count > 0;
        const isActive = isTheme && activeTheme === u.effectValue;
        
        // Corrected affordability logic
        const canAffordCoins = currentCoins >= cost;
        const canAfford = isTheme ? (isOwned || canAffordCoins) : canAffordCoins;

        // UI Logic: Repeatable items always show price. Themes show price until owned.
        const shouldShowPrice = !isTheme || !isOwned;

        if (isLocked) {
          return React.createElement('div', { 
            key: u.id, 
            className: "p-4 bg-black/5 border-2 border-dashed border-black/10 rounded-xl opacity-60 flex items-center justify-between" 
          },
            React.createElement('div', null,
              React.createElement('div', { className: "font-bold text-black/50" }, "???"),
              React.createElement('div', { className: "text-xs text-black/40" }, "Locked")
            ),
            React.createElement('div', { className: "text-xs font-black text-black/40 uppercase" }, `Unlocks at Level ${u.unlockLevel}`)
          );
        }

        return React.createElement('button', {
          key: u.id,
          onClick: () => onBuy(u),
          disabled: isTheme ? (isActive || !canAfford) : !canAfford,
          className: `w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center group
            ${isActive 
              ? 'bg-emerald-500 border-emerald-600 shadow-inner' 
              : (canAfford 
                ? 'bg-white/80 border-black/5 hover:border-emerald-400 hover:shadow-md' 
                : 'bg-black/5 border-transparent opacity-70 grayscale'
              )
            }`
        },
          React.createElement('div', { className: "flex-1 pr-4" },
            React.createElement('div', { className: "flex items-center gap-2" },
              React.createElement('span', { className: `font-bold ${isActive ? 'text-white' : 'text-emerald-900'}` }, u.name),
              !isTheme && React.createElement('span', { className: "text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold" }, `Lv ${count}`),
              isTheme && isOwned && !isActive && React.createElement('span', { className: "text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-bold" }, "Owned"),
              isActive && React.createElement('span', { className: "text-[10px] bg-white text-emerald-600 px-1.5 py-0.5 rounded-full font-bold" }, "Active")
            ),
            React.createElement('div', { 
              className: `text-xs mt-1 leading-tight ${isActive ? 'text-emerald-50' : 'text-emerald-600'}` 
            }, u.description)
          ),
          React.createElement('div', { className: "text-right min-w-[100px]" },
            shouldShowPrice ? React.createElement(React.Fragment, null,
              React.createElement('div', { className: `text-sm font-black ${canAfford ? 'text-emerald-600' : 'text-red-400'}` }, 
                cost > 0 ? cost.toLocaleString() : 'FREE'
              ),
              React.createElement('div', { className: "text-[10px] font-bold opacity-40 uppercase" }, "CapyCoins")
            ) : React.createElement('div', { className: `text-sm font-black ${isActive ? 'text-white' : 'text-emerald-500'}` }, 
              isActive ? 'EQUIPPED' : 'USE'
            )
          )
        );
      })
    )
  );
};

export default UpgradeList;
