
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, UpgradeCategory, Upgrade } from './types';
import { UPGRADES, LEVEL_BASE_XP, LEVEL_EXPONENT, COST_GROWTH } from './constants';
import Capybara from './components/Capybara';
import UpgradeList from './components/UpgradeList';
import Stats from './components/Stats';

const INITIAL_STATE: GameState = {
  coins: 0,
  totalCoinsEarned: 0,
  level: 1,
  xp: 0,
  upgradesPurchased: { 'th1': 1 },
  prestigePoints: 0,
  lastTick: Date.now(),
  activeTheme: 'emerald',
};

const THEME_STYLES: Record<string, { bg: string, accent: string, text: string, card: string }> = {
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

export default function App() {
  const [state, setState] = useState<GameState>(() => {
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

  const [floatingTexts, setFloatingTexts] = useState<{ id: number; x: number; y: number; text: string }[]>([]);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Persistence
  useEffect(() => {
    localStorage.setItem('capy_clicker_save', JSON.stringify(state));
  }, [state]);

  // Derived Stats
  const getUpgradeCount = (id: string) => state.upgradesPurchased[id] || 0;

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
        case 'addCPC': cpc += (u.effectValue as number) * count; break;
        case 'addCPS': cps += (u.effectValue as number) * count; break;
        case 'critChance': critChance += (u.effectValue as number) * count; break;
        case 'critMult': critMult += (u.effectValue as number) * count; break;
        case 'prestigeMult': pMult += (u.effectValue as number) * count; break;
      }
    });

    UPGRADES.forEach(u => {
      const count = getUpgradeCount(u.id);
      if (count === 0) return;
      if (u.effectType === 'multCPC') cpc *= Math.pow(1 + (u.effectValue as number), count);
      if (u.effectType === 'multCPS') cps *= Math.pow(1 + (u.effectValue as number), count);
    });

    return { cpc, cps, critChance, critMult, pMult };
  }, [state.upgradesPurchased]);

  const { cpc, cps, critChance, critMult } = calculateStats();

  const handleLeveling = (newCoinsTotal: number) => {
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

  const addCoins = (amount: number) => {
    if (isNaN(amount) || amount === Infinity) return;
    setState(prev => {
      const newTotal = prev.totalCoinsEarned + amount;
      const { level, xp } = handleLeveling(newTotal);
      return {
        ...prev,
        coins: prev.coins + amount,
        totalCoinsEarned: newTotal,
        level,
        xp,
      };
    });
  };

  const handleCapyClick = (x: number, y: number) => {
    const isCrit = Math.random() * 100 < critChance;
    const amount = isCrit ? cpc * critMult : cpc;
    addCoins(amount);
    
    const id = Date.now() + Math.random();
    setFloatingTexts(prev => [...prev, { id, x, y, text: `+${Math.floor(amount).toLocaleString()}${isCrit ? ' CRIT!' : ''}` }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== id));
    }, 1000);
  };

  const buyUpgrade = (upgrade: Upgrade) => {
    const count = getUpgradeCount(upgrade.id);
    const cost = Math.floor(upgrade.baseCost * Math.pow(COST_GROWTH, count));

    if (state.coins >= cost || count > 0) {
      setState(prev => {
        const newState = { ...prev };
        
        // Handle themes specially
        if (upgrade.effectType === 'unlockTheme') {
          newState.activeTheme = upgrade.effectValue as string;
        }

        // Only deduct cost if buying for the first time or if it's repeatable
        // Themes are usually single purchase then "selectable"
        if (prev.coins >= cost && count === 0) {
          newState.coins = prev.coins - cost;
          newState.upgradesPurchased = {
            ...prev.upgradesPurchased,
            [upgrade.id]: 1
          };
        } else if (count > 0 && upgrade.category !== UpgradeCategory.THEMES) {
          // Repeatable upgrades (non-themes)
          newState.coins = prev.coins - cost;
          newState.upgradesPurchased = {
            ...prev.upgradesPurchased,
            [upgrade.id]: count + 1
          };
        }
        
        return newState;
      });
    }
  };

  const resetGame = () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      setState(INITIAL_STATE);
    }
  };

  // Game Loop
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

  return (
    <div className={`flex h-screen w-screen bg-gradient-to-br ${currentStyle.bg} transition-all duration-1000`}>
      {/* Left: Capy & Stats */}
      <div className="flex-1 flex flex-col items-center justify-center relative p-8">
        <div className="absolute top-8 w-full px-8">
          <Stats 
            coins={state.coins} 
            level={state.level} 
            xp={state.xp} 
            xpNext={Math.floor(LEVEL_BASE_XP * Math.pow(state.level, LEVEL_EXPONENT))}
            cpc={cpc}
            cps={cps}
            theme={currentStyle}
          />
        </div>

        <div className="mt-12">
          <Capybara onClick={handleCapyClick} />
        </div>

        {floatingTexts.map(t => (
          <div key={t.id} className="floating-text absolute text-2xl font-bold text-white drop-shadow-lg select-none z-50 whitespace-nowrap" style={{ left: t.x, top: t.y }}>
            {t.text}
          </div>
        ))}

        <div className="absolute bottom-8 left-8">
           <button 
             onClick={resetGame}
             className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-semibold hover:bg-red-500 transition-colors shadow-sm backdrop-blur-md"
           >
             Hard Reset
           </button>
        </div>
      </div>

      {/* Right: Upgrades */}
      <div className={`w-[450px] bg-${currentStyle.card} backdrop-blur-xl shadow-2xl flex flex-col h-screen transition-all duration-500`}>
        <div className={`p-6 border-b border-${currentStyle.accent}-200 bg-${currentStyle.accent}-500/10`}>
          <h2 className={`text-2xl font-bold text-${currentStyle.accent}-800`}>Upgrade Shop</h2>
          <p className={`text-${currentStyle.accent}-600 text-sm`}>110 Unique Upgrades across {Object.keys(UpgradeCategory).length} Categories!</p>
        </div>
        
        <div className="flex-1 overflow-y-auto no-select scroll-smooth">
          <UpgradeList 
            upgrades={UPGRADES} 
            purchased={state.upgradesPurchased} 
            playerLevel={state.level} 
            currentCoins={state.coins}
            onBuy={buyUpgrade}
            activeTheme={state.activeTheme}
          />
        </div>
      </div>
    </div>
  );
}
