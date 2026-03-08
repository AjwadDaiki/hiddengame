/**
 * Seed script — populates MongoDB with mock game data
 * Usage: node scripts/seed.mjs
 * Or via npm: npm run seed
 */

import mongoose from 'mongoose'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

// ─── Inline game data (same as data/games.ts but plain JS) ───────────────────
// We duplicate the data here to avoid TypeScript compilation issues in the seed script.
// Keep in sync with data/games.ts when adding real games.

const GAMES = [
  {
    slug: 'neon-requiem', title: 'Neon Requiem',
    description: "RPG d'action atmospherique dans un Tokyo futuriste en ruines.",
    genre: 'RPG', subgenre: 'Action', players: '1-4 Co-op',
    rating: 4.8, ratingCount: '128K', size: '48 MB',
    isNew: false, isFlash: false, isFeatured: true, playCount: 89420,
    accent: '#a855f7', gradientFrom: '#1a0533', gradientVia: '#4c1d95', gradientTo: '#7c3aed',
    embedUrl: '', howToPlay: 'Deplace-toi avec WASD. Attaque avec Espace, esquive avec Shift.',
    onlinePlayers: '8 420 en ligne', tags: ['RPG', 'Action', 'Cyberpunk', 'Co-op'],
  },
  {
    slug: 'oceania-wars', title: 'Oceania Wars',
    description: "MMO massif dans un monde post-apocalyptique sous les oceans.",
    genre: 'MMO', players: 'Multijoueur massif',
    rating: 4.9, ratingCount: '312K', size: '62 MB', rank: 1,
    isNew: false, isFlash: false, playCount: 312000,
    accent: '#2c5364', gradientFrom: '#0f2027', gradientVia: '#203a43', gradientTo: '#2c5364',
    embedUrl: '', onlinePlayers: '45 230 en ligne', tags: ['MMO', 'Strategie', 'Multijoueur'],
  },
  {
    slug: 'crimson-drop', title: 'Crimson Drop',
    description: "100 joueurs, 1 survivant. Battle royale ultra-realiste.",
    genre: 'Battle Royale', players: '100 joueurs',
    rating: 4.7, ratingCount: '890K', size: '38 MB', rank: 2,
    isNew: false, isFlash: false, playCount: 890000,
    accent: '#f43f5e', gradientFrom: '#3d0030', gradientVia: '#c2185b', gradientTo: '#f43f5e',
    embedUrl: '', onlinePlayers: '128 500 en ligne', tags: ['Battle Royale', 'Action', 'Survie'],
  },
  {
    slug: 'void-protocol', title: 'Void Protocol',
    description: "FPS tactique dans des stations spatiales abandonnees. Zero gravity combat.",
    genre: 'FPS', subgenre: 'Tactique', players: '5v5',
    rating: 4.6, ratingCount: '445K', size: '42 MB', rank: 3,
    isNew: false, isFlash: false, playCount: 445000,
    accent: '#3b82f6', gradientFrom: '#0c1445', gradientVia: '#1e3a8a', gradientTo: '#3b82f6',
    embedUrl: '', onlinePlayers: '32 100 en ligne', tags: ['FPS', 'Tactique', 'Sci-Fi', '5v5'],
  },
  {
    slug: 'verdant-wilds', title: 'Verdant Wilds',
    description: "Survie dans un monde ouvert luxuriant. Construis, chasse, evolue.",
    genre: 'Survie', players: '1-8 Co-op',
    rating: 4.5, ratingCount: '203K', size: '55 MB', rank: 4,
    isNew: false, isFlash: false, playCount: 203000,
    accent: '#22c55e', gradientFrom: '#052e16', gradientVia: '#166534', gradientTo: '#16a34a',
    embedUrl: '', onlinePlayers: '18 700 en ligne', tags: ['Survie', 'Open World', 'Co-op'],
  },
  {
    slug: 'iron-storm', title: 'Iron Storm',
    description: "Combat de rue brutal et technique. 200 personnages, systeme de combos infini.",
    genre: 'Combat', players: '1-2 / Online',
    rating: 4.8, ratingCount: '178K', size: '28 MB', rank: 5,
    isNew: false, isFlash: false, playCount: 178000,
    accent: '#f97316', gradientFrom: '#200122', gradientVia: '#6f0000', gradientTo: '#ff6b35',
    embedUrl: '', onlinePlayers: '22 890 en ligne', tags: ['Combat', 'Fighting', 'Arcade'],
  },
  {
    slug: 'astral-gate', title: 'Astral Gate',
    description: "JRPG epique a travers 7 dimensions. 80 heures d'histoire. 400 quetes.",
    genre: 'JRPG', players: '1 joueur',
    rating: 4.9, ratingCount: '95K', size: '70 MB', rank: 6,
    isNew: false, isFlash: false, playCount: 95000,
    accent: '#a855f7', gradientFrom: '#1a0533', gradientVia: '#4c1d95', gradientTo: '#7c3aed',
    embedUrl: '', onlinePlayers: '5 340 en ligne', tags: ['JRPG', 'RPG', 'Fantaisie'],
  },
  {
    slug: 'monochrome', title: 'Monochrome',
    description: "Puzzle narratif en niveaux de gris. Chaque couleur revele un fragment du passe.",
    genre: 'Puzzle', subgenre: 'Narratif', players: '1 joueur',
    rating: 4.7, ratingCount: '67K', size: '8 MB', rank: 7,
    isNew: false, isFlash: false, playCount: 67000,
    accent: '#94a3b8', gradientFrom: '#0a0a0a', gradientVia: '#2a2a2a', gradientTo: '#4a4a4a',
    embedUrl: '', onlinePlayers: '3 210 en ligne', tags: ['Puzzle', 'Narratif', 'Indie'],
  },
  {
    slug: 'terraforma', title: 'Terraforma',
    description: "Strategie spatiale en temps reel. Colonise des planetes, construis un empire.",
    genre: 'Strategie', players: '1-8 Online',
    rating: 4.6, ratingCount: '88K', size: '18 MB', rank: 8,
    isNew: false, isFlash: false, playCount: 88000,
    accent: '#84cc16', gradientFrom: '#1a2a00', gradientVia: '#4a7c59', gradientTo: '#84cc16',
    embedUrl: '', onlinePlayers: '9 660 en ligne', tags: ['Strategie', 'Sci-Fi', 'Gestion'],
  },
  {
    slug: 'pulsar-station', title: 'Pulsar Station',
    description: "Simulation spatiale en open world. Gere une station orbitale.",
    genre: 'Simulation', subgenre: 'Sci-Fi', players: '1-4 Co-op',
    rating: 4.8, ratingCount: '12K', size: '45 MB',
    isNew: true, isFlash: false, playCount: 12000,
    accent: '#06b6d4', gradientFrom: '#0f172a', gradientVia: '#0e7490', gradientTo: '#06b6d4',
    embedUrl: '', onlinePlayers: '7 890 en ligne', tags: ['Simulation', 'Sci-Fi', 'Espace'],
  },
  {
    slug: 'red-protocol', title: 'Red Protocol',
    description: "Action cinematographique dans un Paris en guerre.",
    genre: 'Action', players: '1 joueur',
    rating: 4.9, ratingCount: '8K', size: '80 MB',
    isNew: true, isFlash: false, playCount: 8000,
    accent: '#ef4444', gradientFrom: '#450a0a', gradientVia: '#991b1b', gradientTo: '#dc2626',
    embedUrl: '', onlinePlayers: '15 670 en ligne', tags: ['Action', 'Guerre', 'Solo'],
  },
  {
    slug: 'dream-weaver', title: 'Dream Weaver',
    description: "RPG onirique dans des mondes generes par ton subconscient.",
    genre: 'RPG', subgenre: 'Rogue-like', players: '1 joueur',
    rating: 4.7, ratingCount: '18K', size: '12 MB',
    isNew: true, isFlash: false, playCount: 18000,
    accent: '#ec4899', gradientFrom: '#2d1b69', gradientVia: '#7c3aed', gradientTo: '#ec4899',
    embedUrl: '', onlinePlayers: '9 340 en ligne', tags: ['RPG', 'Rogue-like', 'Onirique'],
  },
  {
    slug: 'nexus-arena', title: 'Nexus Arena',
    description: "MOBA nouvelle generation avec destruction d'environnement totale.",
    genre: 'MOBA', players: '5v5',
    rating: 4.5, ratingCount: '24K', size: '30 MB',
    isNew: true, isFlash: false, playCount: 24000,
    accent: '#3b82f6', gradientFrom: '#0c1445', gradientVia: '#1e3a8a', gradientTo: '#2563eb',
    embedUrl: '', onlinePlayers: '41 200 en ligne', tags: ['MOBA', 'Strategie', '5v5'],
  },
  {
    slug: 'gold-league', title: 'Gold League 25',
    description: "Football simulation ultra-realiste. Mode carriere nouvelle generation.",
    genre: 'Sport', players: '1-22 Online',
    rating: 4.2, ratingCount: '540K', size: '58 MB',
    isNew: true, isFlash: false, playCount: 540000,
    accent: '#f59e0b', gradientFrom: '#1c1917', gradientVia: '#78350f', gradientTo: '#b45309',
    embedUrl: '', onlinePlayers: '76 450 en ligne', tags: ['Sport', 'Football', 'Simulation'],
  },
  {
    slug: 'stardrift', title: 'Stardrift',
    description: "Platformer artistique dans des tableaux en mouvement.",
    genre: 'Platformer', players: '1-2 Co-op',
    rating: 4.8, ratingCount: '29K', size: '6 MB',
    isNew: true, isFlash: false, playCount: 29000,
    accent: '#a855f7', gradientFrom: '#2d1b69', gradientVia: '#5b21b6', gradientTo: '#a855f7',
    embedUrl: '', onlinePlayers: '13 880 en ligne', tags: ['Platformer', 'Artistique', 'Indie'],
  },
  // Flash games
  {
    slug: 'stick-war', title: 'Stick War',
    description: "Le classique de strategie stick figure. Construis une armee et conquiers le monde.",
    genre: 'Strategie', players: '1 joueur',
    rating: 4.9, ratingCount: '2.1M', size: '2 MB',
    isNew: false, isFlash: true, playCount: 2100000,
    accent: '#f59e0b', gradientFrom: '#1c1917', gradientVia: '#44403c', gradientTo: '#78716c',
    embedUrl: '/flash/stick-war.swf', howToPlay: 'Clique pour recruter des unites.',
    tags: ['Strategie', 'Flash', 'Classique'],
  },
  {
    slug: 'age-of-war', title: 'Age of War',
    description: "Defends ta base a travers les ages, de la prehistoire au futur.",
    genre: 'Strategie', subgenre: 'Defense', players: '1 joueur',
    rating: 4.8, ratingCount: '1.4M', size: '3 MB',
    isNew: false, isFlash: true, playCount: 1400000,
    accent: '#a78bfa', gradientFrom: '#2e1065', gradientVia: '#4c1d95', gradientTo: '#7c3aed',
    embedUrl: '/flash/age-of-war.swf', howToPlay: 'Clique en bas pour creer des unites.',
    tags: ['Strategie', 'Defense', 'Flash'],
  },
  {
    slug: 'bloons-td', title: 'Bloons Tower Defense',
    description: "Place des singes archers pour eclater les ballons ennemis.",
    genre: 'Tower Defense', players: '1 joueur',
    rating: 4.7, ratingCount: '3.2M', size: '4 MB',
    isNew: false, isFlash: true, playCount: 3200000,
    accent: '#22c55e', gradientFrom: '#052e16', gradientVia: '#166534', gradientTo: '#16a34a',
    embedUrl: '/flash/bloons-td.swf', howToPlay: 'Selectionne une tour et place-la sur la carte.',
    tags: ['Tower Defense', 'Flash', 'Strategie'],
  },
  {
    slug: 'fancy-pants', title: 'Fancy Pants Adventures',
    description: "Le platformer Flash legendaire. Fluidite et style incomparables.",
    genre: 'Platformer', players: '1 joueur',
    rating: 4.9, ratingCount: '1.8M', size: '2 MB',
    isNew: false, isFlash: true, playCount: 1800000,
    accent: '#f97316', gradientFrom: '#431407', gradientVia: '#9a3412', gradientTo: '#ea580c',
    embedUrl: '/flash/fancy-pants.swf', howToPlay: 'Fleches pour courir, S pour sauter.',
    tags: ['Platformer', 'Flash', 'Speedrun'],
  },
  {
    slug: 'sonny', title: 'Sonny',
    description: "RPG zombie Flash avec un systeme de combat en tour par tour profond.",
    genre: 'RPG', players: '1 joueur',
    rating: 4.8, ratingCount: '780K', size: '5 MB',
    isNew: false, isFlash: true, playCount: 780000,
    accent: '#06b6d4', gradientFrom: '#0f172a', gradientVia: '#0e7490', gradientTo: '#0891b2',
    embedUrl: '/flash/sonny.swf', howToPlay: 'Clique sur tes capacites pour attaquer.',
    tags: ['RPG', 'Flash', 'Zombie'],
  },
  {
    slug: 'learn-to-fly', title: 'Learn to Fly',
    description: "Aide un pingouin a apprendre a voler. Bats des records de distance.",
    genre: 'Arcade', players: '1 joueur',
    rating: 4.6, ratingCount: '2.5M', size: '1 MB',
    isNew: false, isFlash: true, playCount: 2500000,
    accent: '#a855f7', gradientFrom: '#2d1b69', gradientVia: '#5b21b6', gradientTo: '#a855f7',
    embedUrl: '/flash/learn-to-fly.swf', howToPlay: 'Lance le pingouin en cliquant.',
    tags: ['Arcade', 'Flash', 'Casual'],
  },
]

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/arcadewave'

const GameSchema = new mongoose.Schema(
  {
    slug:          { type: String, required: true, unique: true },
    title:         { type: String, required: true },
    description:   { type: String, required: true },
    genre:         { type: String, required: true },
    subgenre:      { type: String },
    players:       { type: String, default: '1 joueur' },
    rating:        { type: Number, default: 4.0 },
    ratingCount:   { type: String, default: '0' },
    size:          { type: String, default: '—' },
    rank:          { type: Number },
    isNew:         { type: Boolean, default: false },
    isFlash:       { type: Boolean, default: false },
    isFeatured:    { type: Boolean, default: false },
    accent:        { type: String, required: true },
    gradientFrom:  { type: String, required: true },
    gradientVia:   { type: String, required: true },
    gradientTo:    { type: String, required: true },
    embedUrl:      { type: String },
    howToPlay:     { type: String },
    onlinePlayers: { type: String },
    tags:          [String],
    playCount:     { type: Number, default: 0 },
  },
  { timestamps: true }
)

async function seed() {
  console.log('Connecting to MongoDB:', MONGODB_URI)
  await mongoose.connect(MONGODB_URI)

  const Game = mongoose.model('Game', GameSchema)

  console.log('Dropping existing games...')
  await Game.deleteMany({})

  console.log(`Inserting ${GAMES.length} games...`)
  await Game.insertMany(GAMES)

  const count = await Game.countDocuments()
  console.log(`✓ Done. ${count} games in MongoDB.`)

  await mongoose.disconnect()
}

seed().catch(err => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
