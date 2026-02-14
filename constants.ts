
import { Upgrade, UpgradeCategory } from './types';

export const LEVEL_BASE_XP = 100;
export const LEVEL_EXPONENT = 1.35;
export const COST_GROWTH = 1.30;

export const UPGRADES: Upgrade[] = [
  // --- ORIGINAL 50 UPGRADES (1-50) ---
  { id: 'cp1', name: 'Tiny Paws', description: '+1 Coin per click.', baseCost: 15, category: UpgradeCategory.CLICK_POWER, unlockLevel: 1, effectType: 'addCPC', effectValue: 1 },
  { id: 'cp2', name: 'Gentle Boop', description: '+3 Coins per click.', baseCost: 100, category: UpgradeCategory.CLICK_POWER, unlockLevel: 2, effectType: 'addCPC', effectValue: 3 },
  { id: 'cp3', name: 'Citrus Hat', description: '+10 Coins per click.', baseCost: 500, category: UpgradeCategory.CLICK_POWER, unlockLevel: 4, effectType: 'addCPC', effectValue: 10 },
  { id: 'cp4', name: 'Mud Bath', description: '+25 Coins per click.', baseCost: 2500, category: UpgradeCategory.CLICK_POWER, unlockLevel: 6, effectType: 'addCPC', effectValue: 25 },
  { id: 'cp5', name: 'Spa Day', description: '+75 Coins per click.', baseCost: 10000, category: UpgradeCategory.CLICK_POWER, unlockLevel: 8, effectType: 'addCPC', effectValue: 75 },
  { id: 'cp6', name: 'Hot Spring', description: '+200 Coins per click.', baseCost: 50000, category: UpgradeCategory.CLICK_POWER, unlockLevel: 10, effectType: 'addCPC', effectValue: 200 },
  { id: 'cp7', name: 'Golden Scratches', description: '+500 Coins per click.', baseCost: 200000, category: UpgradeCategory.CLICK_POWER, unlockLevel: 12, effectType: 'addCPC', effectValue: 500 },
  { id: 'cp8', name: 'Heavy Petting', description: '+1,500 Coins per click.', baseCost: 1000000, category: UpgradeCategory.CLICK_POWER, unlockLevel: 15, effectType: 'addCPC', effectValue: 1500 },
  { id: 'cp9', name: 'Royal Massage', description: '+5,000 Coins per click.', baseCost: 5000000, category: UpgradeCategory.CLICK_POWER, unlockLevel: 18, effectType: 'addCPC', effectValue: 5000 },
  { id: 'cp10', name: 'Titan Tap', description: '+15,000 Coins per click.', baseCost: 25000000, category: UpgradeCategory.CLICK_POWER, unlockLevel: 20, effectType: 'addCPC', effectValue: 15000 },

  { id: 'ai1', name: 'Guinea Pig Pal', description: 'Generates 1 CPS.', baseCost: 50, category: UpgradeCategory.AUTO_INCOME, unlockLevel: 5, effectType: 'addCPS', effectValue: 1 },
  { id: 'ai2', name: 'Duck Buddy', description: 'Generates 5 CPS.', baseCost: 300, category: UpgradeCategory.AUTO_INCOME, unlockLevel: 7, effectType: 'addCPS', effectValue: 5 },
  { id: 'ai3', name: 'Turtle Taxi', description: 'Generates 20 CPS.', baseCost: 1500, category: UpgradeCategory.AUTO_INCOME, unlockLevel: 10, effectType: 'addCPS', effectValue: 20 },
  { id: 'ai4', name: 'River Stream', description: 'Generates 100 CPS.', baseCost: 8000, category: UpgradeCategory.AUTO_INCOME, unlockLevel: 13, effectType: 'addCPS', effectValue: 100 },
  { id: 'ai5', name: 'Bamboo Forest', description: 'Generates 450 CPS.', baseCost: 40000, category: UpgradeCategory.AUTO_INCOME, unlockLevel: 16, effectType: 'addCPS', effectValue: 450 },
  { id: 'ai6', name: 'Lily Pad Pond', description: 'Generates 2,000 CPS.', baseCost: 180000, category: UpgradeCategory.AUTO_INCOME, unlockLevel: 19, effectType: 'addCPS', effectValue: 2000 },
  { id: 'ai7', name: 'Capy Sanctuary', description: 'Generates 8,500 CPS.', baseCost: 750000, category: UpgradeCategory.AUTO_INCOME, unlockLevel: 22, effectType: 'addCPS', effectValue: 8500 },
  { id: 'ai8', name: 'Waterfall Cave', description: 'Generates 40,000 CPS.', baseCost: 3500000, category: UpgradeCategory.AUTO_INCOME, unlockLevel: 25, effectType: 'addCPS', effectValue: 40000 },
  { id: 'ai9', name: 'Rainforest Kingdom', description: 'Generates 180,000 CPS.', baseCost: 15000000, category: UpgradeCategory.AUTO_INCOME, unlockLevel: 28, effectType: 'addCPS', effectValue: 180000 },
  { id: 'ai10', name: 'Capy Utopia', description: 'Generates 1,000,000 CPS.', baseCost: 100000000, category: UpgradeCategory.AUTO_INCOME, unlockLevel: 30, effectType: 'addCPS', effectValue: 1000000 },

  { id: 'mu1', name: 'Golden Grass', description: 'x1.1 total CPS.', baseCost: 1000, category: UpgradeCategory.MULTIPLIERS, unlockLevel: 10, effectType: 'multCPS', effectValue: 0.1 },
  { id: 'mu2', name: 'Sun Bathing', description: 'x1.2 total CPS.', baseCost: 5000, category: UpgradeCategory.MULTIPLIERS, unlockLevel: 12, effectType: 'multCPS', effectValue: 0.2 },
  { id: 'mu3', name: 'Zen Mode', description: 'x1.1 click power.', baseCost: 20000, category: UpgradeCategory.MULTIPLIERS, unlockLevel: 15, effectType: 'multCPC', effectValue: 0.1 },
  { id: 'mu4', name: 'Harmony', description: 'x1.3 total CPS.', baseCost: 100000, category: UpgradeCategory.MULTIPLIERS, unlockLevel: 18, effectType: 'multCPS', effectValue: 0.3 },
  { id: 'mu5', name: 'Ecosystem', description: 'x1.4 total CPS.', baseCost: 500000, category: UpgradeCategory.MULTIPLIERS, unlockLevel: 22, effectType: 'multCPS', effectValue: 0.4 },
  { id: 'mu6', name: 'Social Grooming', description: 'x1.2 click power.', baseCost: 2500000, category: UpgradeCategory.MULTIPLIERS, unlockLevel: 26, effectType: 'multCPC', effectValue: 0.2 },
  { id: 'mu7', name: 'Capy Wisdom', description: 'x1.5 total CPS.', baseCost: 10000000, category: UpgradeCategory.MULTIPLIERS, unlockLevel: 30, effectType: 'multCPS', effectValue: 0.5 },
  { id: 'mu8', name: 'River Spirit', description: 'x1.6 total CPS.', baseCost: 50000000, category: UpgradeCategory.MULTIPLIERS, unlockLevel: 34, effectType: 'multCPS', effectValue: 0.6 },
  { id: 'mu9', name: 'Infinite Chill', description: 'x1.3 click power.', baseCost: 250000000, category: UpgradeCategory.MULTIPLIERS, unlockLevel: 38, effectType: 'multCPC', effectValue: 0.3 },
  { id: 'mu10', name: 'Nirvana', description: 'x2.0 total CPS.', baseCost: 1000000000, category: UpgradeCategory.MULTIPLIERS, unlockLevel: 40, effectType: 'multCPS', effectValue: 1.0 },

  { id: 'sp1', name: 'Lucky Clover', description: '+5% Crit Chance.', baseCost: 10000, category: UpgradeCategory.SPECIAL, unlockLevel: 20, effectType: 'critChance', effectValue: 5 },
  { id: 'sp2', name: 'Pointy Ears', description: '+100% Crit Multiplier.', baseCost: 50000, category: UpgradeCategory.SPECIAL, unlockLevel: 23, effectType: 'critMult', effectValue: 1.0 },
  { id: 'sp3', name: 'Berry Snack', description: '+10% Crit Chance.', baseCost: 250000, category: UpgradeCategory.SPECIAL, unlockLevel: 26, effectType: 'critChance', effectValue: 10 },
  { id: 'sp4', name: 'Rainbow Mist', description: 'x1.5 all income.', baseCost: 1000000, category: UpgradeCategory.SPECIAL, unlockLevel: 30, effectType: 'multCPS', effectValue: 0.5 },
  { id: 'sp5', name: 'Golden Yawn', description: '+200% Crit Multiplier.', baseCost: 5000000, category: UpgradeCategory.SPECIAL, unlockLevel: 33, effectType: 'critMult', effectValue: 2.0 },
  { id: 'sp6', name: 'Capy Luck', description: '+15% Crit Chance.', baseCost: 25000000, category: UpgradeCategory.SPECIAL, unlockLevel: 36, effectType: 'critChance', effectValue: 15 },
  { id: 'sp7', name: 'Prism Scales', description: 'x2.0 click power.', baseCost: 100000000, category: UpgradeCategory.SPECIAL, unlockLevel: 40, effectType: 'multCPC', effectValue: 1.0 },
  { id: 'sp8', name: 'Magic Orange', description: '+300% Crit Multiplier.', baseCost: 500000000, category: UpgradeCategory.SPECIAL, unlockLevel: 44, effectType: 'critMult', effectValue: 3.0 },
  { id: 'sp9', name: 'Star Dust', description: '+20% Crit Chance.', baseCost: 2000000000, category: UpgradeCategory.SPECIAL, unlockLevel: 47, effectType: 'critChance', effectValue: 20 },
  { id: 'sp10', name: 'Divine Chill', description: 'x3.0 total CPS.', baseCost: 10000000000, category: UpgradeCategory.SPECIAL, unlockLevel: 50, effectType: 'multCPS', effectValue: 2.0 },

  { id: 'lg1', name: 'Spirit of the River', description: 'x10 Prestige Multiplier.', baseCost: 5000000000, category: UpgradeCategory.LATE_GAME, unlockLevel: 40, effectType: 'prestigeMult', effectValue: 10 },
  { id: 'lg2', name: 'Eternal Meadow', description: 'x2.0 all income.', baseCost: 25000000000, category: UpgradeCategory.LATE_GAME, unlockLevel: 45, effectType: 'multCPS', effectValue: 1.0 },
  { id: 'lg3', name: 'Mountain Hermit', description: 'x2.0 click power.', baseCost: 100000000000, category: UpgradeCategory.LATE_GAME, unlockLevel: 50, effectType: 'multCPC', effectValue: 1.0 },
  { id: 'lg4', name: 'Ancient Scroll', description: '+25% Crit Chance.', baseCost: 500000000000, category: UpgradeCategory.LATE_GAME, unlockLevel: 55, effectType: 'critChance', effectValue: 25 },
  { id: 'lg5', name: 'Capy Constellation', description: 'x5.0 total CPS.', baseCost: 2000000000000, category: UpgradeCategory.LATE_GAME, unlockLevel: 60, effectType: 'multCPS', effectValue: 4.0 },
  { id: 'lg6', name: 'Dimension Rift', description: 'x10 Prestige Multiplier.', baseCost: 10000000000000, category: UpgradeCategory.LATE_GAME, unlockLevel: 70, effectType: 'prestigeMult', effectValue: 10 },
  { id: 'lg7', name: 'Singularity', description: 'x10 click power.', baseCost: 50000000000000, category: UpgradeCategory.LATE_GAME, unlockLevel: 80, effectType: 'multCPC', effectValue: 9.0 },
  { id: 'lg8', name: 'Cosmic Zen', description: '+500% Crit Multiplier.', baseCost: 200000000000000, category: UpgradeCategory.LATE_GAME, unlockLevel: 90, effectType: 'critMult', effectValue: 5.0 },
  { id: 'lg9', name: 'God of Chill', description: 'x100 total CPS.', baseCost: 1000000000000000, category: UpgradeCategory.LATE_GAME, unlockLevel: 95, effectType: 'multCPS', effectValue: 99.0 },
  { id: 'lg10', name: 'Omega Capy', description: 'The ultimate form. x1,000 everything.', baseCost: 10000000000000000, category: UpgradeCategory.LATE_GAME, unlockLevel: 100, effectType: 'multCPS', effectValue: 999.0 },

  // --- NEW UPGRADES (51–100) ---
  
  // Nature & Capy Lore (10 upgrades)
  { id: 'nl51', name: 'Deep Forest Roots', description: 'Ancient energy grants +50,000 CPS.', baseCost: 1e12, category: UpgradeCategory.NATURE, unlockLevel: 60, effectType: 'addCPS', effectValue: 50000 },
  { id: 'nl52', name: 'Whispering Willow', description: 'x1.5 Click Power from the trees.', baseCost: 5e12, category: UpgradeCategory.NATURE, unlockLevel: 65, effectType: 'multCPC', effectValue: 0.5 },
  { id: 'nl53', name: 'River Stone Wisdom', description: 'Steadfast income. +100,000 CPS.', baseCost: 2e13, category: UpgradeCategory.NATURE, unlockLevel: 70, effectType: 'addCPS', effectValue: 100000 },
  { id: 'nl54', name: 'Alpha Herd Chant', description: 'x2.0 total CPS from the lore.', baseCost: 1e14, category: UpgradeCategory.NATURE, unlockLevel: 75, effectType: 'multCPS', effectValue: 1.0 },
  { id: 'nl55', name: 'Crystal Waterfall', description: 'Purifying waters grant +1,000,000 CPS.', baseCost: 5e14, category: UpgradeCategory.NATURE, unlockLevel: 80, effectType: 'addCPS', effectValue: 1000000 },
  { id: 'nl56', name: 'Mystic Ferns', description: 'Rare plants boost Click Power by x3.0.', baseCost: 2e15, category: UpgradeCategory.NATURE, unlockLevel: 90, effectType: 'multCPC', effectValue: 2.0 },
  { id: 'nl57', name: 'Ancient Capy Statue', description: 'A relic of the past. +5,000,000 CPS.', baseCost: 1e16, category: UpgradeCategory.NATURE, unlockLevel: 100, effectType: 'addCPS', effectValue: 5000000 },
  { id: 'nl58', name: 'Earth Spirit Pact', description: 'Merge with nature. x5.0 CPS.', baseCost: 5e16, category: UpgradeCategory.NATURE, unlockLevel: 110, effectType: 'multCPS', effectValue: 4.0 },
  { id: 'nl59', name: 'Forest Heart Pulse', description: '+25,000,000 CPS beating steadily.', baseCost: 2e17, category: UpgradeCategory.NATURE, unlockLevel: 115, effectType: 'addCPS', effectValue: 25000000 },
  { id: 'nl60', name: 'World Tree Sap', description: 'The source of all life. x10 CPS.', baseCost: 1e18, category: UpgradeCategory.NATURE, unlockLevel: 120, effectType: 'multCPS', effectValue: 9.0 },

  // Automation & Scaling (10 upgrades)
  { id: 'as61', name: 'Mechanical Scratches', description: 'Auto-petting machines. +10,000 CPC.', baseCost: 5e14, category: UpgradeCategory.AUTOMATION, unlockLevel: 70, effectType: 'addCPC', effectValue: 10000 },
  { id: 'as62', name: 'Conveyor Belts', description: 'Snack delivery automation. x2 CPS.', baseCost: 2e15, category: UpgradeCategory.AUTOMATION, unlockLevel: 75, effectType: 'multCPS', effectValue: 1.0 },
  { id: 'as63', name: 'Steam-Powered Chill', description: 'Industrialized relaxation. +50,000 CPC.', baseCost: 1e16, category: UpgradeCategory.AUTOMATION, unlockLevel: 85, effectType: 'addCPC', effectValue: 50000 },
  { id: 'as64', name: 'Turbo-Tappers', description: 'Optimized clicking gear. x5 Click Power.', baseCost: 5e16, category: UpgradeCategory.AUTOMATION, unlockLevel: 95, effectType: 'multCPC', effectValue: 4.0 },
  { id: 'as65', name: 'Automated Spa System', description: 'Self-cleaning capys. +250,000,000 CPS.', baseCost: 3e17, category: UpgradeCategory.AUTOMATION, unlockLevel: 105, effectType: 'addCPS', effectValue: 250000000 },
  { id: 'as66', name: 'Quantum Computing', description: 'Simulating better naps. x10 CPS.', baseCost: 1e18, category: UpgradeCategory.AUTOMATION, unlockLevel: 115, effectType: 'multCPS', effectValue: 9.0 },
  { id: 'as67', name: 'Cybernetic Enhancements', description: 'The future of chill. +1,000,000 CPC.', baseCost: 8e18, category: UpgradeCategory.AUTOMATION, unlockLevel: 120, effectType: 'addCPC', effectValue: 1000000 },
  { id: 'as68', name: 'Robot Capy Scouts', description: 'Exploring new coin sources. x20 CPS.', baseCost: 5e19, category: UpgradeCategory.AUTOMATION, unlockLevel: 130, effectType: 'multCPS', effectValue: 19.0 },
  { id: 'as69', name: 'Nanoswarm Massage', description: 'Total automation. +5,000,000 CPC.', baseCost: 2e20, category: UpgradeCategory.AUTOMATION, unlockLevel: 135, effectType: 'addCPC', effectValue: 5000000 },
  { id: 'as70', name: 'Galactic Server Farm', description: 'Hosting the Capyverse. x100 CPS.', baseCost: 1e21, category: UpgradeCategory.AUTOMATION, unlockLevel: 140, effectType: 'multCPS', effectValue: 99.0 },

  // High-Risk / High-Reward (10 upgrades)
  { id: 'hr71', name: 'Cursed Coin Pot', description: 'Risk it all. +20% Crit Chance.', baseCost: 1e17, category: UpgradeCategory.RISK_REWARD, unlockLevel: 80, effectType: 'critChance', effectValue: 20 },
  { id: 'hr72', name: 'Gambler\'s Gaze', description: 'Luck increases. x5 Crit Multiplier.', baseCost: 1e18, category: UpgradeCategory.RISK_REWARD, unlockLevel: 90, effectType: 'critMult', effectValue: 4.0 },
  { id: 'hr73', name: 'Volcano Spa Day', description: 'Hot! x10 Click Power.', baseCost: 1e19, category: UpgradeCategory.RISK_REWARD, unlockLevel: 100, effectType: 'multCPC', effectValue: 9.0 },
  { id: 'hr74', name: 'Storm Chasing', description: 'Catch the lightning. +15% Crit Chance.', baseCost: 5e19, category: UpgradeCategory.RISK_REWARD, unlockLevel: 110, effectType: 'critChance', effectValue: 15 },
  { id: 'hr75', name: 'Void Pact', description: 'Dark power. x25 CPS.', baseCost: 2e20, category: UpgradeCategory.RISK_REWARD, unlockLevel: 120, effectType: 'multCPS', effectValue: 24.0 },
  { id: 'hr76', name: 'Obsidian Claws', description: 'Sharp and dangerous. x10 Crit Multiplier.', baseCost: 1e21, category: UpgradeCategory.RISK_REWARD, unlockLevel: 130, effectType: 'critMult', effectValue: 9.0 },
  { id: 'hr77', name: 'Chaos Orb', description: 'Unstable gains. +50% Crit Chance.', baseCost: 1e22, category: UpgradeCategory.RISK_REWARD, unlockLevel: 140, effectType: 'critChance', effectValue: 50 },
  { id: 'hr78', name: 'Solar Flare Strike', description: 'Pure energy. x50 Click Power.', baseCost: 5e22, category: UpgradeCategory.RISK_REWARD, unlockLevel: 150, effectType: 'multCPC', effectValue: 49.0 },
  { id: 'hr79', name: 'Eclipse Ritual', description: 'The sun hides. x100 CPS.', baseCost: 2e23, category: UpgradeCategory.RISK_REWARD, unlockLevel: 155, effectType: 'multCPS', effectValue: 99.0 },
  { id: 'hr80', name: 'Devil\'s Bargain', description: 'The ultimate risk. x500 all Crit stats.', baseCost: 1e24, category: UpgradeCategory.RISK_REWARD, unlockLevel: 160, effectType: 'critMult', effectValue: 499.0 },

  // Endgame Power (10 upgrades)
  { id: 'ep81', name: 'Dimension Hopper', description: 'Coins from other worlds. +10B CPS.', baseCost: 1e20, category: UpgradeCategory.ENDGAME, unlockLevel: 100, effectType: 'addCPS', effectValue: 1e10 },
  { id: 'ep82', name: 'Nebula Naps', description: 'Sleeping in the stars. x200 CPS.', baseCost: 5e21, category: UpgradeCategory.ENDGAME, unlockLevel: 110, effectType: 'multCPS', effectValue: 199.0 },
  { id: 'ep83', name: 'Black Hole Stomach', description: 'Unlimited snack capacity. x500 CPC.', baseCost: 2e22, category: UpgradeCategory.ENDGAME, unlockLevel: 125, effectType: 'multCPC', effectValue: 499.0 },
  { id: 'ep84', name: 'Event Horizon Chill', description: 'Frozen in time. +50B CPS.', baseCost: 1e23, category: UpgradeCategory.ENDGAME, unlockLevel: 140, effectType: 'addCPS', effectValue: 5e10 },
  { id: 'ep85', name: 'Multiverse Herd', description: 'Infinite capys. x1,000 CPS.', baseCost: 5e24, category: UpgradeCategory.ENDGAME, unlockLevel: 155, effectType: 'multCPS', effectValue: 999.0 },
  { id: 'ep86', name: 'Space-Time Tear', description: 'Reality bends. x2,500 Click Power.', baseCost: 2e25, category: UpgradeCategory.ENDGAME, unlockLevel: 170, effectType: 'multCPC', effectValue: 2499.0 },
  { id: 'ep87', name: 'Supernova Snack', description: 'Explosive flavor. +1T CPS.', baseCost: 1e26, category: UpgradeCategory.ENDGAME, unlockLevel: 180, effectType: 'addCPS', effectValue: 1e12 },
  { id: 'ep88', name: 'Galaxy Core Spa', description: 'Infinite warmth. x10,000 CPS.', baseCost: 5e27, category: UpgradeCategory.ENDGAME, unlockLevel: 190, effectType: 'multCPS', effectValue: 9999.0 },
  { id: 'ep89', name: 'Universal Truth', description: 'The answer is Capy. x50,000 CPS.', baseCost: 1e29, category: UpgradeCategory.ENDGAME, unlockLevel: 195, effectType: 'multCPS', effectValue: 49999.0 },
  { id: 'ep90', name: 'Alpha and Omega', description: 'Beginning and end. x1,000,000 everything.', baseCost: 1e31, category: UpgradeCategory.ENDGAME, unlockLevel: 200, effectType: 'multCPS', effectValue: 999999.0 },

  // God-Tier / Meta (10 upgrades)
  { id: 'gt91', name: 'Prestige Master', description: 'Meta progression. x100 Prestige Power.', baseCost: 1e25, category: UpgradeCategory.GOD_TIER, unlockLevel: 150, effectType: 'prestigeMult', effectValue: 99.0 },
  { id: 'gt92', name: 'Chrono-Shift', description: 'Double all speed. x2 CPS & CPC.', baseCost: 1e27, category: UpgradeCategory.GOD_TIER, unlockLevel: 165, effectType: 'multCPS', effectValue: 1.0 },
  { id: 'gt93', name: 'Reality Editor', description: 'Rewrite the rules. +100% Crit Chance.', baseCost: 1e29, category: UpgradeCategory.GOD_TIER, unlockLevel: 180, effectType: 'critChance', effectValue: 100 },
  { id: 'gt94', name: 'Infinite Essence', description: 'Pure meta energy. x1,000 Click Power.', baseCost: 1e31, category: UpgradeCategory.GOD_TIER, unlockLevel: 200, effectType: 'multCPC', effectValue: 999.0 },
  { id: 'gt95', name: 'Divine Presence', description: 'Godly aura. x1,000,000 CPS.', baseCost: 1e33, category: UpgradeCategory.GOD_TIER, unlockLevel: 220, effectType: 'multCPS', effectValue: 999999.0 },
  { id: 'gt96', name: 'Legacy of Chill', description: 'Passed through eons. x1,000 Prestige.', baseCost: 1e35, category: UpgradeCategory.GOD_TIER, unlockLevel: 240, effectType: 'prestigeMult', effectValue: 999.0 },
  { id: 'gt97', name: 'Omnipresence', description: 'Everywhere at once. x10M CPS.', baseCost: 1e37, category: UpgradeCategory.GOD_TIER, unlockLevel: 260, effectType: 'multCPS', effectValue: 9999999.0 },
  { id: 'gt98', name: 'Transcendent Form', description: 'Beyond physical. x1B Click Power.', baseCost: 1e39, category: UpgradeCategory.GOD_TIER, unlockLevel: 280, effectType: 'multCPC', effectValue: 999999999.0 },
  { id: 'gt99', name: 'Creator\'s Spark', description: 'The developer\'s gift. x1T CPS.', baseCost: 1e42, category: UpgradeCategory.GOD_TIER, unlockLevel: 295, effectType: 'multCPS', effectValue: 999999999999.0 },
  { id: 'gt100', name: 'Zentopia', description: 'The absolute endgame. Infinity awaits.', baseCost: 1e45, category: UpgradeCategory.GOD_TIER, unlockLevel: 300, effectType: 'multCPS', effectValue: 1e15 },

  // --- THEMES TAB (10 upgrades) ---
  { id: 'th1', name: 'Emerald Meadows', description: 'Default lush green environment.', baseCost: 0, category: UpgradeCategory.THEMES, unlockLevel: 1, effectType: 'unlockTheme', effectValue: 'emerald' },
  { id: 'th2', name: 'Soothing Sunset', description: 'Warm orange skies and soft light.', baseCost: 50000, category: UpgradeCategory.THEMES, unlockLevel: 10, effectType: 'unlockTheme', effectValue: 'sunset' },
  { id: 'th3', name: 'Midnight Mystery', description: 'A deep purple night with shining stars.', baseCost: 1000000, category: UpgradeCategory.THEMES, unlockLevel: 25, effectType: 'unlockTheme', effectValue: 'midnight' },
  { id: 'th4', name: 'Oceanic Calm', description: 'Cool blue waters and deep sea vibes.', baseCost: 50000000, category: UpgradeCategory.THEMES, unlockLevel: 40, effectType: 'unlockTheme', effectValue: 'ocean' },
  { id: 'th5', name: 'Sakura Blossom', description: 'Peaceful pink petals and cherry trees.', baseCost: 1000000000, category: UpgradeCategory.THEMES, unlockLevel: 55, effectType: 'unlockTheme', effectValue: 'sakura' },
  { id: 'th6', name: 'Golden Royal', description: 'Fit for a King Capy. Gold and black.', baseCost: 100000000000, category: UpgradeCategory.THEMES, unlockLevel: 75, effectType: 'unlockTheme', effectValue: 'royal' },
  { id: 'th7', name: 'Cyber Neon', description: 'The future is bright. Cyan and magenta.', baseCost: 10000000000000, category: UpgradeCategory.THEMES, unlockLevel: 100, effectType: 'unlockTheme', effectValue: 'neon' },
  { id: 'th8', name: 'Desert Oasis', description: 'Sunny sands and shifting dunes.', baseCost: 1000000000000000, category: UpgradeCategory.THEMES, unlockLevel: 125, effectType: 'unlockTheme', effectValue: 'desert' },
  { id: 'th9', name: 'Lavender Fields', description: 'Fragrant purple flowers as far as the eye can see.', baseCost: 1e18, category: UpgradeCategory.THEMES, unlockLevel: 150, effectType: 'unlockTheme', effectValue: 'lavender' },
  { id: 'th10', name: 'Transcendent Void', description: 'Beyond the physical realm. Dark and ethereal.', baseCost: 1e21, category: UpgradeCategory.THEMES, unlockLevel: 200, effectType: 'unlockTheme', effectValue: 'void' }
];
