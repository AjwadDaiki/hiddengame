import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllGenres, getGamesByGenre } from '@/lib/games-api'
import GenrePageClient from '@/components/genre-page-client'

interface Props {
  params: { genre: string }
}

export async function generateStaticParams() {
  const genres = await getAllGenres()
  return genres.map(g => ({ genre: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const genres = await getAllGenres()
  const genre = genres.find(g => g.slug === params.genre)
  if (!genre) return { title: 'Genre introuvable — ArcadeWave' }

  const title = `Jeux ${genre.name} gratuits en ligne | ArcadeWave`
  const description = `Joue aux meilleurs jeux de ${genre.name} gratuitement dans ton navigateur. ${genre.count} jeux disponibles sans téléchargement.`

  return {
    title,
    description,
    openGraph: { title, description, siteName: 'ArcadeWave' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function GenrePage({ params }: Props) {
  const [genres, games] = await Promise.all([
    getAllGenres(),
    getGamesByGenre(params.genre, 48),
  ])

  const genre = genres.find(g => g.slug === params.genre)
  if (!genre) notFound()

  return <GenrePageClient genre={genre} games={games} allGenres={genres} />
}
