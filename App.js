
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
        // Ensure settings exist for legacy saves
        if (!parsed.settings) parsed.settings = INITIAL_STATE.settings;
        return { ...INITIAL_STATE, ...parsed };
      } catch (e) {
        return INITIAL_STATE;
      }
    }
    return INITIAL_STATE;
  });

  const [floatingTexts, setFloatingTexts] = useState([]);
  const [resetProgress, setResetProgress] = useState(0);
  const resetTimerRef = useRef(null);
  const musicRef = useRef(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Persistence
  useEffect(() => {
    localStorage.setItem('capy_clicker_save', JSON.stringify(state));
  }, [state]);

  // Audio Logic
  useEffect(() => {
    musicRef.current = new Audio(AUDIO_URLS.music);
    musicRef.current.loop = true;
    musicRef.current.volume = 0.2;

    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!musicRef.current) return;
    if (state.settings.musicEnabled) {
      musicRef.current.play().catch(() => {});
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

  const getUpgradeCount = (id) => state.upgradesPurchased[id] || 0;

  const calculateStats = useCallback(() => {
    let cpc = 1;
    let cps = 0;
    let critChance = 0;
    let critMult = 2;

    UPGRADES.forEach(u => {
      const count = getUpgradeCount(u.id);
      if (count === 0) return;
      if (u.effectType === 'addCPC') cpc += u.effectValue * count;
      if (u.effectType === 'addCPS') cps += u.effectValue * count;
      if (u.effectType === 'critChance') critChance += u.effectValue * count;
      if (u.effectType === 'critMult') critMult += u.effectValue * count;
    });

    UPGRADES.forEach(u => {
      const count = getUpgradeCount(u.id);
      if (count === 0) return;
      if (u.effectType === 'multCPC') cpc *= Math.pow(1 + u.effectValue, count);
      if (u.effectType === 'multCPS') cps *= Math.pow(1 + u.effectValue, count);
    });

    return { cpc, cps, critChance, critMult };
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
    return { level, xp: currentXp };
  };

  const addCoins = (amount) => {
    setState(prev => {
      const newTotal = prev.totalCoinsEarned + amount;
      const { level, xp } = handleLeveling(newTotal);
      if (level > prev.level) setTimeout(() => playSFX('levelUp'), 0);
      return { ...prev, coins: prev.coins + amount, totalCoinsEarned: newTotal, level, xp };
    });
  };

  const handleCapyClick = (x, y) => {
    if (state.settings.musicEnabled && musicRef.current?.paused) {
      musicRef.current.play().catch(() => {});
    }
    playSFX('click');
    const isCrit = Math.random() * 100 < critChance;
    const amount = isCrit ? cpc * critMult : cpc;
    addCoins(amount);
    const id = Date.now() + Math.random();
    setFloatingTexts(prev => [...prev, { id, x, y, text: `+${Math.floor(amount).toLocaleString()}${isCrit ? ' CRIT!' : ''}` }]);
    setTimeout(() => setFloatingTexts(prev => prev.filter(t => t.id !== id)), 1000);
  };

  const buyUpgrade = (upgrade) => {
    const count = getUpgradeCount(upgrade.id);
    const cost = Math.floor(upgrade.baseCost * Math.pow(COST_GROWTH, count));
    const isTheme = upgrade.category === UpgradeCategory.THEMES;
    if (state.coins >= cost || (isTheme && count > 0)) {
      playSFX('buy');
      setState(prev => {
        const currentCount = prev.upgradesPurchased[upgrade.id] || 0;
        const currentCost = Math.floor(upgrade.baseCost * Math.pow(COST_GROWTH, currentCount));
        const newState = { ...prev };
        if (isTheme) {
          newState.activeTheme = upgrade.effectValue;
          if (currentCount === 0 && prev.coins >= currentCost) {
            newState.coins = prev.coins - currentCost;
            newState.upgradesPurchased = { ...prev.upgradesPurchased, [upgrade.id]: 1 };
          }
        } else if (prev.coins >= currentCost) {
          newState.coins = prev.coins - currentCost;
          newState.upgradesPurchased = { ...prev.upgradesPurchased, [upgrade.id]: currentCount + 1 };
        }
        return newState;
      });
    }
  };

  const startResetTimer = () => {
    setResetProgress(0);
    const start = Date.now();
    resetTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(100, (elapsed / 1500) * 100);
      setResetProgress(progress);
      if (progress >= 100) {
        clearInterval(resetTimerRef.current);
        localStorage.removeItem('capy_clicker_save');
        window.location.reload();
      }
    }, 20);
  };

  const cancelResetTimer = () => {
    clearInterval(resetTimerRef.current);
    setResetProgress(0);
  };

  const toggleSetting = (key) => {
    setState(prev => ({ ...prev, settings: { ...prev.settings, [key]: !prev.settings[key] } }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentStats = calculateStats();
      if (currentStats.cps > 0) addCoins(currentStats.cps / 10);
    }, 100);
    return () => clearInterval(interval);
  }, [calculateStats]);

  const currentStyle = THEME_STYLES[state.activeTheme] || THEME_STYLES.emerald;

  return React.createElement('div', { className: `flex h-screen w-screen bg-gradient-to-br ${currentStyle.bg} transition-all duration-1000 overflow-hidden` },
    React.createElement('div', { className: "flex-1 flex flex-col items-center justify-center relative p-8" },
      React.createElement('div', { className: "absolute top-8 w-full px-8" },
        React.createElement(Stats, { 
          coins: state.coins, 
          level: state.level, 
          xp: state.xp, 
          xpNext: Math.floor(LEVEL_BASE_XP * Math.pow(state.level, LEVEL_EXPONENT)),
          cpc, cps, theme: currentStyle 
        })
      ),
      React.createElement('div', { className: "mt-12" }, React.createElement(Capybara, { onClick: handleCapyClick })),
      floatingTexts.map(t => React.createElement('div', { key: t.id, className: "floating-text absolute text-2xl font-bold text-white drop-shadow-lg select-none z-50 whitespace-nowrap", style: { left: t.x, top: t.y } }, t.text)),
      
      // Hard Reset Button with Hold Logic
      React.createElement('div', { className: "absolute bottom-8 left-8" },
        React.createElement('button', { 
          onMouseDown: startResetTimer, onTouchStart: startResetTimer,
          onMouseUp: cancelResetTimer, onTouchEnd: cancelResetTimer, onMouseLeave: cancelResetTimer,
          className: "relative px-4 py-2 bg-black/20 text-white rounded-lg text-xs font-bold uppercase tracking-tighter hover:bg-red-500 transition-colors shadow-sm backdrop-blur-md overflow-hidden"
        }, 
          React.createElement('div', { className: "absolute left-0 top-0 h-full bg-red-600/50 transition-all", style: { width: `${resetProgress}%` } }),
          React.createElement('span', { className: "relative z-10" }, "Hold 2s to Reset")
        )
      ),
      
      // Audio Controls
      React.createElement('div', { className: "absolute bottom-8 right-8 flex gap-3 p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20" },
        React.createElement('button', { onClick: () => toggleSetting('musicEnabled'), className: `p-3 rounded-xl transition-all ${state.settings.musicEnabled ? 'bg-emerald-500 text-white' : 'bg-black/20 text-white/50'}` }, 
          React.createElement('span', null, state.settings.musicEnabled ? '🎵' : '🔇')
        ),
        React.createElement('button', { onClick: () => toggleSetting('sfxEnabled'), className: `p-3 rounded-xl transition-all ${state.settings.sfxEnabled ? 'bg-emerald-500 text-white' : 'bg-black/20 text-white/50'}` }, 
          React.createElement('span', null, state.settings.sfxEnabled ? '🔊' : '🔇')
        )
      )
    ),
    React.createElement('div', { className: `w-[450px] bg-${currentStyle.card} backdrop-blur-xl shadow-2xl flex flex-col h-screen` },
      React.createElement('div', { className: `p-6 border-b border-${currentStyle.accent}-200 bg-${currentStyle.accent}-500/10` },
        React.createElement('h2', { className: `text-2xl font-bold text-${currentStyle.accent}-800` }, "Upgrade Shop")
      ),
      React.createElement('div', { className: "flex-1 overflow-y-auto" },
        React.createElement(UpgradeList, { upgrades: UPGRADES, purchased: state.upgradesPurchased, playerLevel: state.level, currentCoins: state.coins, onBuy: buyUpgrade, activeTheme: state.activeTheme })
      )
    )
  );
}
