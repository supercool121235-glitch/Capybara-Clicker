
export enum UpgradeCategory {
  CLICK_POWER = '🖱 Click Power',
  AUTO_INCOME = '⏱ Auto Income',
  MULTIPLIERS = '✖ Multipliers',
  SPECIAL = '🧪 Special Effects',
  LATE_GAME = '🏆 Late Game',
  NATURE = '🌿 Nature & Lore',
  AUTOMATION = '⚙ Automation',
  RISK_REWARD = '🔮 High-Risk',
  ENDGAME = '🌌 Endgame Power',
  GOD_TIER = '👑 God-Tier',
  THEMES = '🎨 Themes'
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  category: UpgradeCategory;
  unlockLevel: number;
  effectType: 'addCPC' | 'addCPS' | 'multCPS' | 'multCPC' | 'critChance' | 'critMult' | 'prestigeMult' | 'unlockTheme';
  effectValue: number | string;
}

export interface GameState {
  coins: number;
  totalCoinsEarned: number;
  level: number;
  xp: number;
  upgradesPurchased: Record<string, number>;
  prestigePoints: number;
  lastTick: number;
  activeTheme: string;
}
