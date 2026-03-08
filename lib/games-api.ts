import { ALL_GAMES, TOP_GAMES, RECENT_GAMES, NEW_GAMES, FEATURED_GAME, Game } from '@/data/games'
import connectDB from './mongodb'
import GameModel from './models/game.model'

// ─── helpers ─────────────────────────────────────────────────────────────────
async function db() {
  try {
    await connectDB()
    return true
  } catch {
    return false
  }
}

function docToGame(doc: any): Game {
  const raw = doc.toJSON ? doc.toJSON() : { ...doc }
  // isNew is reserved in Mongoose — stored as isNewGame in DB
  if ('isNewGame' in raw) {
    raw.isNew = raw.isNewGame
    delete raw.isNewGame
  }
  return {
    ...raw,
    id: raw._id?.toString() ?? raw.id ?? raw.slug,
  } as Game
}

// ─── Fetch by slug ────────────────────────────────────────────────────────────
export async function getGameBySlug(slug: string): Promise<Game | null> {
  if (await db()) {
    const doc = await GameModel.findOne({ slug }).lean()
    if (doc) return docToGame(doc)
  }
  return ALL_GAMES.find(g => g.slug === slug) ?? null
}

// ─── Fetch top games ──────────────────────────────────────────────────────────
export async function getTopGames(limit = 20): Promise<Game[]> {
  if (await db()) {
    const docs = await GameModel.find({ isFlash: { $ne: true } })
      .sort({ playCount: -1, rating: -1 })
      .limit(limit)
      .lean()
    if (docs.length) return docs.map(docToGame)
  }
  return TOP_GAMES.slice(0, limit)
}

// ─── Fetch by genre ───────────────────────────────────────────────────────────
export async function getGamesByGenre(genre: string, limit = 24): Promise<Game[]> {
  if (await db()) {
    const regex = new RegExp(`^${genre}$`, 'i')
    const docs = await GameModel.find({ $or: [{ genre: regex }, { subgenre: regex }] })
      .limit(limit)
      .lean()
    if (docs.length) return docs.map(docToGame)
  }
  return ALL_GAMES.filter(g =>
    g.genre.toLowerCase() === genre.toLowerCase() ||
    g.subgenre?.toLowerCase() === genre.toLowerCase()
  )
}

// ─── Fetch new games ──────────────────────────────────────────────────────────
export async function getNewGames(limit = 20): Promise<Game[]> {
  if (await db()) {
    const docs = await GameModel.find({ isNew: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
    if (docs.length) return docs.map(docToGame)
  }
  return NEW_GAMES.slice(0, limit)
}

// ─── Fetch flash games ────────────────────────────────────────────────────────
export async function getFlashGames(limit = 20): Promise<Game[]> {
  if (await db()) {
    const docs = await GameModel.find({ isFlash: true }).limit(limit).lean()
    if (docs.length) return docs.map(docToGame)
  }
  return ALL_GAMES.filter(g => g.isFlash).slice(0, limit)
}

// ─── Search games ─────────────────────────────────────────────────────────────
export async function searchGames(query: string, limit = 20): Promise<Game[]> {
  if (!query.trim()) return []
  if (await db()) {
    const regex = new RegExp(query, 'i')
    const docs = await GameModel.find({
      $or: [{ title: regex }, { description: regex }, { genre: regex }, { tags: regex }],
    })
      .limit(limit)
      .lean()
    if (docs.length) return docs.map(docToGame)
  }
  const q = query.toLowerCase()
  return ALL_GAMES.filter(
    g =>
      g.title.toLowerCase().includes(q) ||
      g.genre.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q)
  ).slice(0, limit)
}

// ─── Get related games ────────────────────────────────────────────────────────
export async function getRelatedGames(game: Game, limit = 8): Promise<Game[]> {
  if (await db()) {
    const docs = await GameModel.find({
      slug: { $ne: game.slug },
      $or: [{ genre: game.genre }, { subgenre: game.genre }],
    })
      .limit(limit)
      .lean()
    if (docs.length >= 4) return docs.map(docToGame)
  }
  const candidates = ALL_GAMES.filter(
    g => g.id !== game.id && (g.genre === game.genre || g.subgenre === game.genre)
  )
  return candidates.length >= 4
    ? candidates.slice(0, limit)
    : ALL_GAMES.filter(g => g.id !== game.id).slice(0, limit)
}

// ─── Increment play count ─────────────────────────────────────────────────────
export async function incrementPlayCount(slug: string): Promise<void> {
  if (!(await db())) return
  await GameModel.updateOne({ slug }, { $inc: { playCount: 1 } })
}

// ─── Get all slugs (for generateStaticParams) ─────────────────────────────────
export async function getAllGameSlugs(): Promise<string[]> {
  if (await db()) {
    const docs = await GameModel.find({}, { slug: 1 }).lean()
    if (docs.length) return docs.map((d: any) => d.slug)
  }
  return ALL_GAMES.map(g => g.slug)
}

// ─── Get all genres ───────────────────────────────────────────────────────────
export async function getAllGenres(): Promise<{ slug: string; name: string; count: number }[]> {
  if (await db()) {
    const agg = await GameModel.aggregate([
      { $group: { _id: { $toLower: '$genre' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])
    if (agg.length) {
      return agg.map(({ _id, count }) => ({
        slug: _id,
        name: _id.charAt(0).toUpperCase() + _id.slice(1),
        count,
      }))
    }
  }
  const genres = new Map<string, number>()
  ALL_GAMES.forEach(g => {
    const key = g.genre.toLowerCase()
    genres.set(key, (genres.get(key) ?? 0) + 1)
  })
  return Array.from(genres.entries()).map(([slug, count]) => ({
    slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    count,
  }))
}
