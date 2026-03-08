import { Metadata } from 'next'
import { getTopGames } from '@/lib/games-api'
import TopGamesClient from '@/components/top-games-client'

export const metadata: Metadata = {
  title: 'Top Jeux — Les plus joués en ce moment',
  description: 'Découvre les jeux HTML5 les plus populaires du moment. Classement en temps réel par nombre de parties jouées.',
  openGraph: { title: 'Top Jeux | ArcadeWave', description: 'Les jeux les plus joués du moment.' },
}

export default async function TopGamesPage() {
  const games = await getTopGames(24)
  return <TopGamesClient games={games} />
}
