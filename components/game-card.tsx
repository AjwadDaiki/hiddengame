'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Game } from '@/data/games'

interface GameCardProps {
  game: Game
  size?: 'sm' | 'md' | 'lg'
  isFocused?: boolean
  onHover?: (game: Game) => void
  onHoverEnd?: () => void
  onClick?: (game: Game) => void
}

const SIZES = {
  sm: { w: 160, h: 224 },
  md: { w: 192, h: 272 },
  lg: { w: 220, h: 310 },
}

export default function GameCard({
  game,
  size = 'md',
  isFocused = false,
  onHover,
  onHoverEnd,
  onClick,
}: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { w, h } = SIZES[size]
  const active = isHovered || isFocused

  return (
    <motion.div
      style={{ width: w, flexShrink: 0 }}
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onHoverStart={() => { setIsHovered(true); onHover?.(game) }}
      onHoverEnd={() => { setIsHovered(false); onHoverEnd?.() }}
      onClick={() => onClick?.(game)}
      className="cursor-pointer select-none"
    >
      {/* Art container */}
      <div
        className="relative overflow-hidden card-shine"
        style={{
          height: h,
          borderRadius: '18px',
          background: `linear-gradient(145deg, ${game.gradientFrom}, ${game.gradientVia}, ${game.gradientTo})`,
          border: `1px solid ${active ? game.accent + '65' : game.accent + '18'}`,
          boxShadow: active
            ? `0 24px 70px rgba(0,0,0,0.55), 0 0 0 1px ${game.accent}55, 0 0 50px ${game.accent}28, inset 0 1px 0 rgba(255,255,255,0.08)`
            : `0 4px 24px rgba(0,0,0,0.35), 0 0 20px ${game.accent}0a`,
          transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
        }}
      >
        {/* Abstract art */}
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id={`blur-card-${game.id}`}>
              <feGaussianBlur stdDeviation="10"/>
            </filter>
          </defs>
          <circle cx={w * 0.5} cy={h * 0.35} r={w * 0.45} fill={game.accent} filter={`url(#blur-card-${game.id})`} opacity="0.35"/>
          <circle cx={w * 0.75} cy={h * 0.75} r={w * 0.3} fill={game.gradientVia} filter={`url(#blur-card-${game.id})`} opacity="0.25"/>
          <polygon
            points={`${w * 0.5},${h * 0.05} ${w * 0.95},${h * 0.85} ${w * 0.05},${h * 0.85}`}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"
          />
          <circle cx={w * 0.5} cy={h * 0.5} r={w * 0.38} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        </svg>

        {/* Letter watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <span
            className="font-black select-none"
            style={{
              fontSize: w * 0.65,
              lineHeight: 1,
              color: 'rgba(255,255,255,0.04)',
              letterSpacing: '-0.05em',
            }}
          >
            {game.title.charAt(0)}
          </span>
        </div>

        {/* Art zoom on hover */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: active ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* NEW badge */}
        {game.isNew && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
              NEW
            </span>
          </div>
        )}

        {/* Rank badge */}
        {game.rank && (
          <div className="absolute top-3 right-3">
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
              style={{
                background: game.rank <= 3 ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.1)',
                color: game.rank <= 3 ? '#f59e0b' : 'rgba(255,255,255,0.5)',
                border: `1px solid ${game.rank <= 3 ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.1)'}`,
              }}
            >
              #{game.rank}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }}
        />

        {/* Hover info (bottom) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-3"
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-end justify-between">
            <div>
              <span
                className="inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md mb-1.5 backdrop-blur-sm"
                style={{
                  background: `${game.accent}25`,
                  color: game.accent,
                  border: `1px solid ${game.accent}30`,
                }}
              >
                {game.genre}
              </span>
              <p className="text-xs text-white/50">{game.players}</p>
            </div>
            {/* Play button */}
            <motion.div
              className="w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.15)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Progress bar (recently played) */}
        {game.progress && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5">
            <div
              className="h-full"
              style={{
                width: `${game.progress}%`,
                background: `linear-gradient(90deg, ${game.gradientVia}, ${game.accent})`,
              }}
            />
          </div>
        )}
      </div>

      {/* Card info below art */}
      <div className="pt-3 px-0.5">
        <p className="text-sm font-bold text-white leading-tight truncate">{game.title}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-white/35 font-medium">
            {game.lastPlayed ?? game.ratingCount + ' notes'}
          </p>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-amber-400" viewBox="0 0 24 24" fill="#f59e0b">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span className="text-xs font-bold text-white/50">{game.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
