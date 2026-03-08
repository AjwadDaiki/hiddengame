import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IGame extends Document {
  slug: string
  title: string
  description: string
  genre: string
  subgenre?: string
  players: string
  rating: number
  ratingCount: string
  size: string
  playtime?: string
  lastPlayed?: string
  rank?: number
  isNewGame?: boolean
  isFlash?: boolean
  isFeatured?: boolean
  progress?: number
  accent: string
  gradientFrom: string
  gradientVia: string
  gradientTo: string
  embedUrl?: string
  howToPlay?: string
  onlinePlayers?: string
  tags?: string[]
  thumbnailUrl?: string
  playCount: number
}

const GameSchema = new Schema<IGame>(
  {
    slug:          { type: String, required: true, unique: true, index: true },
    title:         { type: String, required: true },
    description:   { type: String, required: true },
    genre:         { type: String, required: true, index: true },
    subgenre:      String,
    players:       { type: String, default: '1 joueur' },
    rating:        { type: Number, default: 4.0, min: 0, max: 5 },
    ratingCount:   { type: String, default: '0' },
    size:          { type: String, default: '—' },
    playtime:      String,
    lastPlayed:    String,
    rank:          Number,
    isNewGame:     { type: Boolean, default: false },
    isFlash:       { type: Boolean, default: false, index: true },
    isFeatured:    { type: Boolean, default: false, index: true },
    progress:      Number,
    accent:        { type: String, default: '#a855f7' },
    gradientFrom:  { type: String, default: '#1a0533' },
    gradientVia:   { type: String, default: '#4c1d95' },
    gradientTo:    { type: String, default: '#7c3aed' },
    embedUrl:      String,
    howToPlay:     String,
    onlinePlayers: String,
    tags:          [String],
    thumbnailUrl:  String,
    playCount:     { type: Number, default: 0, index: true },
  },
  { timestamps: true }
)

export const GameModel: Model<IGame> =
  (mongoose.models['Game'] as Model<IGame>) ?? mongoose.model<IGame>('Game', GameSchema)

export default GameModel
