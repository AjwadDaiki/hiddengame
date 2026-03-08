'use client'

import { motion } from 'framer-motion'

interface AmbientBackgroundProps {
  accentColor: string
  accentDark: string
}

export default function AmbientBackground({ accentColor, accentDark }: AmbientBackgroundProps) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      {/* Main blob — top right, large, drifts slowly */}
      <motion.div
        className="absolute rounded-full blob-drift-1"
        animate={{ backgroundColor: accentColor }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{
          width: '900px',
          height: '900px',
          top: '-250px',
          right: '-200px',
          filter: 'blur(160px)',
          opacity: 0.22,
        }}
      />

      {/* Secondary blob — bottom left */}
      <motion.div
        className="absolute rounded-full blob-drift-2"
        animate={{ backgroundColor: accentDark }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
        style={{
          width: '700px',
          height: '700px',
          bottom: '-150px',
          left: '-150px',
          filter: 'blur(140px)',
          opacity: 0.18,
        }}
      />

      {/* Third blob — center, subtle */}
      <motion.div
        className="absolute rounded-full blob-drift-3"
        animate={{ backgroundColor: accentColor }}
        transition={{ duration: 2.0, ease: 'easeInOut' }}
        style={{
          width: '500px',
          height: '500px',
          top: '40%',
          left: '30%',
          filter: 'blur(120px)',
          opacity: 0.10,
        }}
      />

      {/* Fourth blob — mid right, accent variation */}
      <motion.div
        className="absolute rounded-full blob-drift-4"
        animate={{ backgroundColor: accentDark }}
        transition={{ duration: 2.4, ease: 'easeInOut' }}
        style={{
          width: '400px',
          height: '400px',
          top: '55%',
          right: '10%',
          filter: 'blur(100px)',
          opacity: 0.12,
        }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-100" />

      {/* Noise overlay for texture */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(6,6,16,0.65) 100%)',
        }}
      />
    </div>
  )
}
