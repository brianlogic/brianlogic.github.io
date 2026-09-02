import { DiAws, DiJava } from 'react-icons/di'
import {
  SiCss,
  SiDjango,
  SiDocker,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { TbSql } from 'react-icons/tb'

const ICONS = {
  python: <SiPython color="#3776AB" />,
  js: <SiJavascript color="#F7DF1E" />,
  ts: <SiTypescript color="#3178C6" />,
  react: <SiReact color="#61DAFB" />,
  sql: <TbSql color="#336791" />,
  html: (
    <span className="tech-icon__pair">
      <SiHtml5 color="#E34F26" />
      <SiCss color="#1572B6" />
    </span>
  ),
  django: <SiDjango color="#44B78B" />,
  next: <SiNextdotjs color="#E6EEF5" />,
  postgres: <SiPostgresql color="#4169E1" />,
  tailwind: <SiTailwindcss color="#38BDF8" />,
  ec2: <DiAws color="#FF9900" />,
  lambda: <DiAws color="#FF9900" />,
  s3: <DiAws color="#FF9900" />,
  docker: <SiDocker color="#2496ED" />,
  java: <DiJava />,
}

export default function TechIcon({ id, label }) {
  return (
    <span className="tech-icon" title={label}>
      {ICONS[id]}
      <span>{label}</span>
    </span>
  )
}
