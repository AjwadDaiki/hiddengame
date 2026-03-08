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

// 16:9 landscape sizes — console style
const SIZES = {
  sm: { w: 240, h: 135 },
  md: { w: 300, h: 169 },
  lg: { w: 360, h: 203 },
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
      whileHover={{ y: -6, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 340, damping: 24 }}
      onHoverStart={() => { setIsHovered(true); onHover?.(game) }}
      onHoverEnd={() => { setIsHovered(false); onHoverEnd?.() }}
      onClick={() => onClick?.(game)}
      className="cursor-pointer select-none"
    >
      {/* Art container — 16:9 */}
      <div
        className="relative overflow-hidden card-shine"
        style={{
          height: h,
          borderRadius: '12px',
          background: `linear-gradient(145deg, ${game.gradientFrom}, ${game.gradientVia}, ${game.gradientTo})`,
          border: active
            ? `2px solid ${game.accent}`
            : '2px solid rgba(255,255,255,0.07)',
          boxShadow: active
            ? `0 0 0 1px ${game.accent}30, 0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${game.accent}35`
            : '0 4px 20px rgba(0,0,0,0.4)',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Thumbnail if available */}
        {game.thumbnailUrl ? (
          <img
            src={game.thumbnailUrl}
            alt={game.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: active ? 1 : 0.85, transition: 'opacity 0.3s ease' }}
          />
        ) : (
          /* Abstract art fallback */
          <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id={`blur-c-${game.id}`}><feGaussianBlur stdDeviation="12"/></filter>
            </defs>
            <circle cx={w * 0.5} cy={h * 0.4} r={w * 0.4} fill={game.accent} filter={`url(#blur-c-${game.id})`} opacity="0.4"/>
            <circle cx={w * 0.8} cy={h * 0.8} r={w * 0.25} fill={game.gradientVia} filter={`url(#blur-c-${game.id})`} opacity="0.3"/>
            <circle cx={w * 0.15} cy={h * 0.7} r={w * 0.2} fill={game.gradientTo} filter={`url(#blur-c-${game.id})`} opacity="0.25"/>
            {/* Grid lines */}
            <line x1="0" y1={h * 0.5} x2={w} y2={h * 0.5} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
            <line x1={w * 0.5} y1="0" x2={w * 0.5} y2={h} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
            {/* Corner brackets */}
            <path d={`M8,20 L8,8 L20,8`} fill="none" stroke={game.accent} strokeWidth="1.5" opacity="0.5"/>
            <path d={`M${w-8},20 L${w-8},8 L${w-20},8`} fill="none" stroke={game.accent} strokeWidth="1.5" opacity="0.5"/>
          </svg>
        )}

        {/* Letter watermark */}
        {!game.thumbnailUrl && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <span
              className="font-black select-none"
              style={{
                fontSize: w * 0.55,
                lineHeight: 1,
                color: 'rgba(255,255,255,0.04)',
                letterSpacing: '-0.05em',
              }}
            >
              {game.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Dark overlay on hover */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }}
        />

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between">
          {game.isNew && (
            <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-emerald-500/25 text-emerald-400 border border-emerald-500/35 backdrop-blur-sm">
              NEW
            </span>
          )}
          {game.isFlash && !game.isNew && (
            <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider backdrop-blur-sm"
              style={{ background: `${game.accent}25`, color: game.accent, border: `1px solid ${game.accent}35` }}>
              FLASH
            </span>
          )}
          {!game.isNew && !game.isFlash && <span />}

          {game.rank && (
            <span
              className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black backdrop-blur-sm"
              style={{
                background: game.rank <= 3 ? 'rgba(245,158,11,0.3)' : 'rgba(0,0,0,0.5)',
                color: game.rank <= 3 ? '#f59e0b' : 'rgba(255,255,255,0.6)',
                border: `1px solid ${game.rank <= 3 ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.12)'}`,
              }}
            >
              #{game.rank}
            </span>
          )}
        </div>

        {/* Hover bottom info */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-3"
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-end justify-between gap-2">
            <div className="flex-1 min-w-0">
              <span
                className="inline-block text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded mb-1 backdrop-blur-sm"
                style={{ background: `${game.accent}30`, color: game.accent, border: `1px solid ${game.accent}35` }}
              >
                {game.genre}
              </span>
              <p className="text-[11px] text-white/50 truncate">{game.players}</p>
            </div>
            {/* Play button */}
            <motion.div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: game.accent, boxShadow: `0 0 16px ${game.accent}80` }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-3 h-3 ml-0.5" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Focus ring glow — active game indicator */}
        {isFocused && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              boxShadow: `inset 0 0 0 2px ${game.accent}, 0 0 30px ${game.accent}60`,
            }}
          />
        )}

        {/* Progress bar */}
        {game.progress && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5">
            <div
              className="h-full"
              style={{
                width: `${game.progress}%`,
                background: `linear-gradient(90deg, ${game.gradientVia}, ${game.accent})`,
                boxShadow: `0 0 6px ${game.accent}`,
              }}
            />
          </div>
        )}
      </div>

      {/* Info below card */}
      <div className="pt-2.5 px-0.5">
        <p className="text-sm font-bold text-white leading-tight truncate">{game.title}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-[11px] text-white/30 font-medium truncate">
            {game.lastPlayed ?? game.ratingCount + ' notes'}
          </p>
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#f59e0b">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span className="text-[11px] font-bold text-white/45">{game.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
