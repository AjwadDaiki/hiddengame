import { MetadataRoute } from 'next'
import { getAllGenres } from '@/lib/games-api'
import { ALL_GAMES as GAMES } from '@/data/games'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arcadewave.gg'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const genres = await getAllGenres()

  const gameUrls: MetadataRoute.Sitemap = GAMES.map(game => ({
    url: `${siteUrl}/play/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const genreUrls: MetadataRoute.Sitemap = genres.map(genre => ({
    url: `${siteUrl}/genre/${genre.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/games`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/nostalgie`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/top-games`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    ...gameUrls,
    ...genreUrls,
  ]
}
