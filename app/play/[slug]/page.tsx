import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGameBySlug, getAllGameSlugs, getRelatedGames } from '@/lib/games-api'
import GameDetailClient from '@/components/game-detail-client'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllGameSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = await getGameBySlug(params.slug)
  if (!game) return { title: 'Jeu introuvable — ArcadeWave' }

  const title = `${game.title} — Jouer gratuitement | ArcadeWave`
  const description = `${game.description} Joue a ${game.title} gratuitement sur ArcadeWave. Genre: ${game.genre}. ${game.players}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'ArcadeWave',
      images: game.thumbnailUrl ? [{ url: game.thumbnailUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      // Schema.org VideoGame structured data
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'VideoGame',
        name: game.title,
        description: game.description,
        genre: [game.genre, game.subgenre].filter(Boolean),
        gamePlatform: 'Web Browser',
        applicationCategory: 'Game',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: game.rating,
          ratingCount: game.ratingCount,
          bestRating: 5,
          worstRating: 1,
        },
      }),
    },
  }
}

export default async function PlayPage({ params }: Props) {
  const [game, related] = await Promise.all([
    getGameBySlug(params.slug),
    getGameBySlug(params.slug).then(g => g ? getRelatedGames(g, 6) : []),
  ])

  if (!game) notFound()

  return <GameDetailClient game={game} relatedGames={related} />
}
