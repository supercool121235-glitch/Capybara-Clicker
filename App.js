
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { UpgradeCategory } from './types.js';
import { UPGRADES, LEVEL_BASE_XP, LEVEL_EXPONENT, COST_GROWTH } from './constants.js';
import Capybara from './components/Capybara.js';
import UpgradeList from './components/UpgradeList.js';
import Stats from './components/Stats.js';

const INITIAL_STATE = {
  coins: 0,
  totalCoinsEarned: 0,
  level: 1,
  xp: 0,
  upgradesPurchased: { 'th1': 1 },
  prestigePoints: 0,
  lastTick: Date.now(),
  activeTheme: 'emerald',
  settings: {
    musicEnabled: true,
    sfxEnabled: true
  }
};

const THEME_STYLES = {
  emerald: { bg: 'from-emerald-100 to-emerald-200', accent: 'emerald', text: 'emerald', card: 'white' },
  sunset: { bg: 'from-orange-100 to-red-200', accent: 'orange', text: 'orange', card: 'white' },
  midnight: { bg: 'from-purple-900 to-indigo-900', accent: 'indigo', text: 'indigo-200', card: 'indigo-950/50' },
  ocean: { bg: 'from-blue-200 to-blue-400', accent: 'blue', text: 'blue-900', card: 'white' },
  sakura: { bg: 'from-pink-100 to-pink-200', accent: 'pink', text: 'pink-900', card: 'white' },
  royal: { bg: 'from-yellow-600 to-stone-900', accent: 'yellow', text: 'yellow-100', card: 'stone-900/50' },
  neon: { bg: 'from-zinc-900 to-cyan-900', accent: 'cyan', text: 'cyan-400', card: 'zinc-900/80' },
  desert: { bg: 'from-amber-100 to-orange-200', accent: 'amber', text: 'amber-900', card: 'white' },
  lavender: { bg: 'from-violet-100 to-purple-200', accent: 'violet', text: 'violet-900', card: 'white' },
  void: { bg: 'from-black to-zinc-900', accent: 'zinc', text: 'zinc-400', card: 'black/50' },
};

// High quality audio assets
const AUDIO_URLS = {
  music: 'https://www.chosic.com/wp-content/uploads/2021/07/Rain-and-Puddles.mp3',
  click: 'https://www.soundjay.com/buttons/sounds/button-3.mp3', 
  buy: 'https://actions.google.com/sounds/v1/commerce/cash_register.ogg',
  levelUp: 'https://actions.google.com/sounds/v1/foley/wind_chime_vines.ogg'
};

export default function App() {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('capy_clicker_save');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_STATE, ...parsed };
      } catch (e) {
        console.error("Failed to parse save", e);
        return INITIAL_STATE;
      }
    }
    return INITIAL_STATE;
  });

  const [floatingTexts, setFloatingTexts] = useState([]);
  const musicRef = useRef(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Initialize LoFi Music
  useEffect(() => {
    musicRef.current = new Audio(AUDIO_URLS.music);
    musicRef.current.loop = true;
    musicRef.current.volume = 0.2; // Keep background music subtle

    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
    };
  }, []);

  // Sync music playback with settings
  useEffect(() => {
    if (!musicRef.current) return;
    if (state.settings.musicEnabled) {
      // Note: Browsers block play() until first interaction
      musicRef.current.play().catch(() => {
        console.log("Waiting for interaction to start LoFi music...");
      });
    } else {
      musicRef.current.pause();
    }
  }, [state.settings.musicEnabled]);

  const playSFX = (type) => {
    if (!state.settings.sfxEnabled) return;
    const sfx = new Audio(AUDIO_URLS[type]);
    sfx.volume = type === 'click' ? 0.3 : 0.6;
    sfx.play().catch(() => {});
  };

  useEffect(() => {
    localStorage.setItem('capy_clicker_save', JSON.stringify(state));
  }, [state]);

  const getUpgradeCount = (id) => state.upgradesPurchased[id] || 0;

  const calculateStats = useCallback(() => {
    let cpc = 1;
    let cps = 0;
    let critChance = 0;
    let critMult = 2;
    let pMult = 1;

    UPGRADES.forEach(u => {
      const count = getUpgradeCount(u.id);
      if (count === 0) return;

      switch (u.effectType) {
        case 'addCPC': cpc += u.effectValue * count; break;
        case 'addCPS': cps += u.effectValue * count; break;
        case 'critChance': critChance += u.effectValue * count; break;
        case 'critMult': critMult += u.effectValue * count; break;
        case 'prestigeMult': pMult += u.effectValue * count; break;
      }
    });

    UPGRADES.forEach(u => {
      const count = getUpgradeCount(u.id);
      if (count === 0) return;
      if (u.effectType === 'multCPC') cpc *= Math.pow(1 + u.effectValue, count);
      if (u.effectType === 'multCPS') cps *= Math.pow(1 + u.effectValue, count);
    });

    return { cpc, cps, critChance, critMult, pMult };
  }, [state.upgradesPurchased]);

  const { cpc, cps, critChance, critMult } = calculateStats();

  const handleLeveling = (newCoinsTotal) => {
    let currentXp = newCoinsTotal;
    let level = 1;
    let xpForNext = LEVEL_BASE_XP;

    while (currentXp >= xpForNext) {
      currentXp -= xpForNext;
      level++;
      xpForNext = Math.floor(LEVEL_BASE_XP * Math.pow(level, LEVEL_EXPONENT));
      if (xpForNext === Infinity) break;
    }

    return { level, xp: currentXp, xpForNext };
  };

  const addCoins = (amount) => {
    if (isNaN(amount) || amount === Infinity) return;
    setState(prev => {
      const newTotal = prev.totalCoinsEarned + amount;
      const { level, xp } = handleLeveling(newTotal);
      
      if (level > prev.level) {
        setTimeout(() => playSFX('levelUp'), 0);
      }

      return {
        ...prev,
        coins: prev.coins + amount,
        totalCoinsEarned: newTotal,
        level,
        xp,
      };
    });
  };

  const handleCapyClick = (x, y) => {
    // Attempt to start music if it was blocked by autoplay
    if (state.settings.musicEnabled && musicRef.current && musicRef.current.paused) {
      musicRef.current.play().catch(() => {});
    }

    playSFX('click');
    const isCrit = Math.random() * 100 < critChance;
    const amount = isCrit ? cpc * critMult : cpc;
    addCoins(amount);
    
    const id = Date.now() + Math.random();
    setFloatingTexts(prev => [...prev, { id, x, y, text: `+${Math.floor(amount).toLocaleString()}${isCrit ? ' CRIT!' : ''}` }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== id));
    }, 1000);
  };

  const buyUpgrade = (upgrade) => {
    const count = getUpgradeCount(upgrade.id);
    const cost = Math.floor(upgrade.baseCost * Math.pow(COST_GROWTH, count));
    const isTheme = upgrade.category === UpgradeCategory.THEMES;
    const isOwned = count > 0;

    if (state.coins >= cost || (isTheme && isOwned)) {
      playSFX('buy');
      setState(prev => {
        const currentCount = prev.upgradesPurchased[upgrade.id] || 0;
        const currentCost = Math.floor(upgrade.baseCost * Math.pow(COST_GROWTH, currentCount));
        const newState = { ...prev };
        
        if (isTheme) {
          newState.activeTheme = upgrade.effectValue;
          if (!isOwned && prev.coins >= currentCost) {
            newState.coins = prev.coins - currentCost;
            newState.upgradesPurchased = { ...prev.upgradesPurchased, [upgrade.id]: 1 };
          }
          return newState;
        }

        if (prev.coins >= currentCost) {
          newState.coins = prev.coins - currentCost;
          newState.upgradesPurchased = { ...prev.upgradesPurchased, [upgrade.id]: currentCount + 1 };
          return newState;
        }
        return prev;
      });
    }
  };

  const toggleSetting = (key) => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: !prev.settings[key]
      }
    }));
  };

  const resetGame = () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      setState(INITIAL_STATE);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentStats = calculateStats();
      if (currentStats.cps > 0) {
        addCoins(currentStats.cps / 10);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [calculateStats]);

  const currentStyle = THEME_STYLES[state.activeTheme] || THEME_STYLES.emerald;

  return React.createElement('div', { 
    className: `flex h-screen w-screen bg-gradient-to-br ${currentStyle.bg} transition-all duration-1000` 
  },
    React.createElement('div', { className: "flex-1 flex flex-col items-center justify-center relative p-8" },
      React.createElement('div', { className: "absolute top-8 w-full px-8" },
        React.createElement(Stats, { 
          coins: state.coins, 
          level: state.level, 
          xp: state.xp, 
          xpNext: Math.floor(LEVEL_BASE_XP * Math.pow(state.level, LEVEL_EXPONENT)),
          cpc: cpc,
          cps: cps,
          theme: currentStyle
        })
      ),
      React.createElement('div', { className: "mt-12" },
        React.createElement(Capybara, { onClick: handleCapyClick })
      ),
      floatingTexts.map(t => 
        React.createElement('div', { 
          key: t.id, 
          className: "floating-text absolute text-2xl font-bold text-white drop-shadow-lg select-none z-50 whitespace-nowrap", 
          style: { left: t.x, top: t.y } 
        }, t.text)
      ),
      // Hard Reset Panel
      React.createElement('div', { className: "absolute bottom-8 left-8" },
        React.createElement('button', { 
          onClick: resetGame,
          className: "px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-semibold hover:bg-red-500 transition-colors shadow-sm backdrop-blur-md"
        }, "Hard Reset")
      ),
      // Audio Control Panel
      React.createElement('div', { className: "absolute bottom-8 right-8 flex gap-3 p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" },
        React.createElement('div', { className: "flex flex-col items-center gap-1" },
          React.createElement('button', { 
            onClick: () => toggleSetting('musicEnabled'),
            className: `p-3 rounded-xl transition-all ${state.settings.musicEnabled ? 'bg-emerald-500 text-white' : 'bg-black/20 text-white/50'}`
          }, 
            React.createElement('span', { className: "text-lg" }, state.settings.musicEnabled ? '🎵' : '🔇')
          ),
          React.createElement('span', { className: "text-[10px] font-bold text-emerald-900/40 uppercase" }, "Music")
        ),
        React.createElement('div', { className: "w-[1px] bg-white/20 self-stretch my-2" }),
        React.createElement('div', { className: "flex flex-col items-center gap-1" },
          React.createElement('button', { 
            onClick: () => toggleSetting('sfxEnabled'),
            className: `p-3 rounded-xl transition-all ${state.settings.sfxEnabled ? 'bg-emerald-500 text-white' : 'bg-black/20 text-white/50'}`
          }, 
            React.createElement('span', { className: "text-lg" }, state.settings.sfxEnabled ? '🔊' : '🔇')
          ),
          React.createElement('span', { className: "text-[10px] font-bold text-emerald-900/40 uppercase" }, "SFX")
        )
      )
    ),
    React.createElement('div', { 
      className: `w-[450px] bg-${currentStyle.card} backdrop-blur-xl shadow-2xl flex flex-col h-screen transition-all duration-500` 
    },
      React.createElement('div', { className: `p-6 border-b border-${currentStyle.accent}-200 bg-${currentStyle.accent}-500/10` },
        React.createElement('h2', { className: `text-2xl font-bold text-${currentStyle.accent}-800` }, "Upgrade Shop"),
        React.createElement('p', { className: `text-${currentStyle.accent}-600 text-sm` }, 
          `110 Unique Upgrades across ${Object.keys(UpgradeCategory).length} Categories!`
        )
      ),
      React.createElement('div', { className: "flex-1 overflow-y-auto no-select scroll-smooth" },
        React.createElement(UpgradeList, { 
          upgrades: UPGRADES, 
          purchased: state.upgradesPurchased, 
          playerLevel: state.level, 
          currentCoins: state.coins,
          onBuy: buyUpgrade,
          activeTheme: state.activeTheme
        })
      )
    )
  );
}
