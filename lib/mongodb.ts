import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/arcadewave'

// Cached connection to avoid reconnecting on every hot-reload in dev
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: typeof mongoose | null
}

export async function connectDB(): Promise<typeof mongoose> {
  if (global._mongooseConn) return global._mongooseConn

  if (mongoose.connection.readyState === 1) {
    global._mongooseConn = mongoose
    return mongoose
  }

  await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  })

  global._mongooseConn = mongoose
  return mongoose
}

export default connectDB
