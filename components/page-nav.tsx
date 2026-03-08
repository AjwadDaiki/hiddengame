'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Catalogue', href: '/games' },
  { label: 'Top Jeux', href: '/top-games' },
  { label: 'Nostalgie Flash', href: '/nostalgie' },
]

export default function PageNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-40 flex items-center justify-between px-6 py-3"
      style={{
        backgroundColor: 'rgba(7,7,15,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <motion.div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
          style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', boxShadow: '0 0 16px #a855f750' }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 24px #a855f780' }}
        >
          AW
        </motion.div>
        <span className="font-black text-white tracking-tight text-sm">ArcadeWave</span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map(link => {
          const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
          return (
            <Link key={link.href} href={link.href}>
              <motion.div
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                style={active ? {
                  backgroundColor: 'rgba(168,85,247,0.15)',
                  color: '#a855f7',
                  border: '1px solid rgba(168,85,247,0.25)',
                } : {
                  color: 'rgba(255,255,255,0.45)',
                  border: '1px solid transparent',
                }}
                whileHover={!active ? { color: '#fff', backgroundColor: 'rgba(255,255,255,0.05)' } : {}}
              >
                {link.label}
              </motion.div>
            </Link>
          )
        })}
      </div>

      {/* Right side — search + CTA */}
      <div className="flex items-center gap-3">
        <Link href="/games">
          <motion.div
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border"
            style={{ borderColor: 'rgba(168,85,247,0.35)', color: '#a855f7', backgroundColor: 'rgba(168,85,247,0.08)' }}
            whileHover={{ backgroundColor: 'rgba(168,85,247,0.18)', borderColor: 'rgba(168,85,247,0.6)' }}
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>
            Explorer
          </motion.div>
        </Link>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded-xl"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          onClick={() => setMobileOpen(v => !v)}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 flex flex-col gap-1 p-4 md:hidden"
            style={{ backgroundColor: 'rgba(7,7,15,0.97)', borderBottom: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                <div
                  className="px-4 py-3 rounded-xl text-sm font-semibold"
                  style={{
                    color: pathname === link.href ? '#a855f7' : 'rgba(255,255,255,0.6)',
                    backgroundColor: pathname === link.href ? 'rgba(168,85,247,0.1)' : 'transparent',
                  }}
                >
                  {link.label}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
