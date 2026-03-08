import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/arcadewave'

// Skip MongoDB if URI points to localhost in production (no DB on Vercel/server)
const isLocalhostMongo = MONGODB_URI.includes('localhost') || MONGODB_URI.includes('127.0.0.1')
const isProduction = process.env.NODE_ENV === 'production'
export const SKIP_DB = isProduction && isLocalhostMongo

// Cached connection to avoid reconnecting on every hot-reload in dev
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: typeof mongoose | null
}

export async function connectDB(): Promise<typeof mongoose> {
  if (SKIP_DB) throw new Error('MongoDB skipped (localhost URI in production)')

  if (global._mongooseConn) return global._mongooseConn

  if (mongoose.connection.readyState === 1) {
    global._mongooseConn = mongoose
    return mongoose
  }

  await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
  })

  global._mongooseConn = mongoose
  return mongoose
}

export default connectDB
