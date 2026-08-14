import { motion } from 'framer-motion'
import './BentoCard.css'

const ease = [0.22, 1, 0.36, 1]

export default function BentoCard({
  children,
  className = '',
  delay = 0,
  accent = false,
  immediate = false,
  href,
}) {
  const Tag = href ? motion.a : motion.article
  const extras = href ? { href, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Tag
      className={`bento-card ${accent ? 'is-accent' : ''} ${className}`}
      initial={immediate ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 16, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay: immediate ? 0 : delay, ease }}
      whileHover={{ y: -2 }}
      {...extras}
    >
      {children}
    </Tag>
  )
}
