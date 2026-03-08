import { supabase, isSupabaseConfigured } from './supabase'
import { ALL_GAMES, TOP_GAMES, RECENT_GAMES, NEW_GAMES, FEATURED_GAME, Game } from '@/data/games'

// ─── Fetch by slug ────────────────────────────────────────────────────────────
export async function getGameBySlug(slug: string): Promise<Game | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('slug', slug)
      .single()
    if (!error && data) return data as Game
  }
  return ALL_GAMES.find(g => g.slug === slug) ?? null
}

// ─── Fetch top games ──────────────────────────────────────────────────────────
export async function getTopGames(limit = 20): Promise<Game[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from('games')
      .select('*')
      .order('play_count', { ascending: false })
      .limit(limit)
    if (data?.length) return data as Game[]
  }
  return TOP_GAMES.slice(0, limit)
}

// ─── Fetch by genre ───────────────────────────────────────────────────────────
export async function getGamesByGenre(genre: string, limit = 24): Promise<Game[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from('games')
      .select('*')
      .ilike('genre', genre)
      .limit(limit)
    if (data?.length) return data as Game[]
  }
  return ALL_GAMES.filter(g =>
    g.genre.toLowerCase() === genre.toLowerCase() ||
    (g.subgenre?.toLowerCase() === genre.toLowerCase())
  )
}

// ─── Fetch new games ──────────────────────────────────────────────────────────
export async function getNewGames(limit = 20): Promise<Game[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from('games')
      .select('*')
      .eq('is_new', true)
      .order('created_at', { ascending: false })
      .limit(limit)
    if (data?.length) return data as Game[]
  }
  return NEW_GAMES.slice(0, limit)
}

// ─── Fetch flash games ────────────────────────────────────────────────────────
export async function getFlashGames(limit = 20): Promise<Game[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from('games')
      .select('*')
      .eq('is_flash', true)
      .limit(limit)
    if (data?.length) return data as Game[]
  }
  return ALL_GAMES.filter(g => g.isFlash).slice(0, limit)
}

// ─── Search games ─────────────────────────────────────────────────────────────
export async function searchGames(query: string, limit = 20): Promise<Game[]> {
  if (!query.trim()) return []
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from('games')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,genre.ilike.%${query}%`)
      .limit(limit)
    if (data?.length) return data as Game[]
  }
  const q = query.toLowerCase()
  return ALL_GAMES.filter(g =>
    g.title.toLowerCase().includes(q) ||
    g.genre.toLowerCase().includes(q) ||
    g.description.toLowerCase().includes(q)
  ).slice(0, limit)
}

// ─── Get related games ────────────────────────────────────────────────────────
export async function getRelatedGames(game: Game, limit = 8): Promise<Game[]> {
  const candidates = ALL_GAMES.filter(g =>
    g.id !== game.id &&
    (g.genre === game.genre || g.subgenre === game.genre)
  )
  return candidates.slice(0, limit).length >= 4
    ? candidates.slice(0, limit)
    : ALL_GAMES.filter(g => g.id !== game.id).slice(0, limit)
}

// ─── Increment play count ─────────────────────────────────────────────────────
export async function incrementPlayCount(gameId: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return
  await supabase.rpc('increment_play_count', { game_id: gameId })
}

// ─── Get all slugs (for generateStaticParams) ─────────────────────────────────
export async function getAllGameSlugs(): Promise<string[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('games').select('slug')
    if (data?.length) return data.map(g => g.slug)
  }
  return ALL_GAMES.map(g => g.slug)
}

// ─── Get all genres ───────────────────────────────────────────────────────────
export async function getAllGenres(): Promise<{ slug: string; name: string; count: number }[]> {
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
