'use client'

import { motion } from 'framer-motion'

interface AmbientBackgroundProps {
  accentColor: string
  accentDark: string
}

export default function AmbientBackground({ accentColor, accentDark }: AmbientBackgroundProps) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Main ambient blob top-left */}
      <motion.div
        className="absolute rounded-full"
        animate={{ backgroundColor: accentColor }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        style={{
          width: '800px',
          height: '800px',
          top: '-300px',
          left: '-200px',
          filter: 'blur(140px)',
          opacity: 0.13,
        }}
      />
      {/* Secondary blob bottom-right */}
      <motion.div
        className="absolute rounded-full"
        animate={{ backgroundColor: accentDark }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
        style={{
          width: '600px',
          height: '600px',
          bottom: '-150px',
          right: '-100px',
          filter: 'blur(120px)',
          opacity: 0.10,
        }}
      />
      {/* Accent mid blob */}
      <motion.div
        className="absolute rounded-full"
        animate={{ backgroundColor: accentColor }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
        style={{
          width: '400px',
          height: '400px',
          top: '35%',
          left: '35%',
          filter: 'blur(100px)',
          opacity: 0.06,
        }}
      />
      {/* Static dot grid */}
      <div className="absolute inset-0 dot-grid opacity-100" />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(7,7,15,0.7) 100%)',
        }}
      />
    </div>
  )
}
