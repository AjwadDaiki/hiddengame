'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#07070f' }}>
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: '#a855f7', filter: 'blur(180px)', opacity: 0.07 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: '#3b82f6', filter: 'blur(150px)', opacity: 0.06 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <div className="dot-grid absolute inset-0 opacity-20" />
      </div>

      {/* Neon top line */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(to right, transparent, #a855f7, #3b82f6, transparent)', boxShadow: '0 0 20px #a855f780' }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-8"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 404 number with neon glow */}
        <motion.div
          className="text-[180px] font-black leading-none select-none"
          style={{
            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 40px #a855f760)',
          }}
          animate={{ filter: ['drop-shadow(0 0 30px #a855f750)', 'drop-shadow(0 0 60px #a855f790)', 'drop-shadow(0 0 30px #a855f750)'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          404
        </motion.div>

        {/* Console-style decorative line */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex-1 h-px w-24" style={{ background: 'linear-gradient(to left, #a855f780, transparent)' }} />
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#a855f7' }}>◆ Erreur système ◆</span>
          <div className="flex-1 h-px w-24" style={{ background: 'linear-gradient(to right, #a855f780, transparent)' }} />
        </motion.div>

        <motion.h1
          className="text-2xl font-black text-white mb-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Page introuvable
        </motion.h1>

        <motion.p
          className="text-sm mb-10 max-w-sm leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.45)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Ce jeu ou cette page n'existe pas (ou plus). Retourne au menu principal pour trouver ce que tu cherches.
        </motion.p>

        {/* Console button prompts */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {[
            { symbol: '▶', label: 'Accueil', color: '#22c55e', href: '/' },
            { symbol: '■', label: 'Catalogue', color: '#3b82f6', href: '/games' },
            { symbol: '▲', label: 'Nostalgie', color: '#a855f7', href: '/nostalgie' },
          ].map(btn => (
            <Link key={btn.label} href={btn.href}>
              <motion.div
                className="flex items-center gap-2 px-5 py-3 rounded-2xl border font-bold text-sm"
                style={{
                  borderColor: btn.color + '35',
                  backgroundColor: btn.color + '12',
                  color: btn.color,
                }}
                whileHover={{ backgroundColor: btn.color + '25', borderColor: btn.color + '60', scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{btn.symbol}</span>
                <span>{btn.label}</span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Glitch error code */}
        <motion.p
          className="text-xs font-mono"
          style={{ color: 'rgba(255,255,255,0.15)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          ERR_ROUTE_NOT_FOUND · ARCADEWAVE_SYS · {new Date().getFullYear()}
        </motion.p>
      </motion.div>
    </div>
  )
}
