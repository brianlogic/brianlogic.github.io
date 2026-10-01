import { FaDiscord, FaTerminal, FaTrashAlt } from 'react-icons/fa'
import { SiClaude, SiCursor, SiDocker, SiGooglechrome, SiRoblox, SiSpotify, SiSteam, SiValorant, SiVim } from 'react-icons/si'
import { DiVisualstudio } from 'react-icons/di'
import { TbBrandMinecraft, TbBrandOpenai, TbBrandVscode } from 'react-icons/tb'

// Icons missing from react-icons: drop `<file>.svg|png|webp` into src/assets/icons/
// and reference it with `file`. A file always wins over `Icon`.
const files = import.meta.glob('../assets/icons/*.{svg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const fileUrl = (name) => files[`../assets/icons/${name}`]

const productivity = [
  { label: 'Terminal', Icon: FaTerminal, color: '#E6EEF5' },
  { label: 'Claude Code', Icon: SiClaude, color: '#D97757' },
  { label: 'Codex', Icon: TbBrandOpenai, color: '#E6EEF5' },
  { label: 'Cursor', Icon: SiCursor, color: '#E6EEF5' },
  { label: 'VS Code', Icon: TbBrandVscode, color: '#2F9BEF' },
  { label: 'Visual Studio', Icon: DiVisualstudio, color: '#A67AF4' },
  { label: 'Vim', Icon: SiVim, color: '#19B34C' },
  { label: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { label: 'Chrome', Icon: SiGooglechrome, color: '#4285F4' },
  { label: 'Trash', Icon: FaTrashAlt, color: '#AAB4BE' },
]

const entertainment = [
  { label: 'Minecraft', Icon: TbBrandMinecraft, color: '#5DAA3A' },
  { label: 'Valorant', Icon: SiValorant, color: '#FF4655' },
  { label: 'Overwatch', file: 'overwatch.svg' },
  { label: 'Elden Ring', file: 'elden-ring.svg' },
  { label: 'Roblox', Icon: SiRoblox, color: '#E6EEF5' },
  { label: 'Steam', Icon: SiSteam, color: '#66C0F4' },
  { label: 'Discord', Icon: FaDiscord, color: '#5865F2' },
  { label: 'Spotify', Icon: SiSpotify, color: '#1DB954' },
]

const resolve = (item) => ({ ...item, src: item.file && fileUrl(item.file) })

export const DESKTOP_ICON_GROUPS = [
  { name: 'Productivity', items: productivity.map(resolve) },
  { name: 'Entertainment', items: entertainment.map(resolve) },
]
