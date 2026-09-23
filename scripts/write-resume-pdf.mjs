import { writeFileSync } from 'node:fs'

function esc(text) {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

const commands = []
const page = { w: 612, h: 792 }
let y = 748

function text(value, { size = 11, font = 'F1', x = 54, gap = 16, color = '0 0 0' } = {}) {
  commands.push(`${color} rg`)
  commands.push(`BT /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${esc(value)}) Tj ET`)
  y -= gap
}

function rule() {
  y -= 4
  commands.push('0.75 0.75 0.75 RG')
  commands.push(`${54} ${y} m ${page.w - 54} ${y} l S`)
  y -= 16
}

text('Brian Tran', { size: 22, font: 'F2', gap: 18 })
text('Student & Full Stack Developer', { size: 12, color: '0.25 0.25 0.25', gap: 16 })
text('Ashburn, VA  |  briantra23@gmail.com  |  github.com/brianlogic  |  linkedin.com/in/brian-tran-756508244', {
  size: 9,
  color: '0.3 0.3 0.3',
  gap: 8,
})
rule()

text('Education', { size: 13, font: 'F2', gap: 16 })
text('University of Virginia - Computer Science, applied mathematics minor', { size: 11, font: 'F2', gap: 14 })
text('Third year. Top Secret clearance, U.S. Department of Defense (March 2026).', { size: 10, gap: 8 })
rule()

text('Experience', { size: 13, font: 'F2', gap: 16 })
text('North Point Technology LLC - Full Stack Developer Intern', { size: 11, font: 'F2', gap: 13 })
text('May 2026 - August 2026', { size: 10, color: '0.3 0.3 0.3', gap: 14 })
text('- Form catalog with sections, typed fields, and per-role visibility.', { size: 10, gap: 13 })
text('- Review path from submitter to reviewer to admin, with notes on reject.', { size: 10, gap: 13 })
text('- Next.js, Prisma, Entra ID, Microsoft Graph, Docker, GitHub Actions, AWS EC2.', { size: 10, gap: 16 })
text('North Point Technology LLC - Software Engineer Intern', { size: 11, font: 'F2', gap: 13 })
text('June 2024 - August 2024', { size: 10, color: '0.3 0.3 0.3', gap: 14 })
text('- Daily Python scrapers for defense-prime career sites, with logging and email.', { size: 10, gap: 16 })
text('Kashmir World Foundation - Frontend Developer Intern', { size: 11, font: 'F2', gap: 13 })
text('May 2023 - August 2023', { size: 10, color: '0.3 0.3 0.3', gap: 14 })
text('- React Native screens for camera stations, sightings, and rebait, from Figma.', { size: 10, gap: 8 })
rule()

text('Projects', { size: 13, font: 'F2', gap: 16 })
text('Cursor Dependency Risk Extension - TypeScript check against OSV.dev, with rollback.', { size: 10, gap: 13 })
text('Crisis Hotline Agent - Next.js voice agent, transcripts, and an operator dashboard.', { size: 10, gap: 13 })
text('Modeling Naval Systems - Django and React app for shared SysML diagrams.', { size: 10, gap: 13 })
text("TheCourseForum - Query and filter on UVA's live course-review site.", { size: 10, gap: 8 })
rule()

text('Skills', { size: 13, font: 'F2', gap: 16 })
text('Python, JavaScript, TypeScript, React, Next.js, SQL, PostgreSQL, Django, Docker, AWS, Java', {
  size: 10,
  gap: 14,
})

const stream = commands.join('\n')
const objects = []
function add(body) {
  objects.push(body)
  return objects.length
}

add('<< /Type /Catalog /Pages 2 0 R >>')
add('<< /Type /Pages /Kids [3 0 R] /Count 1 >>')
add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.w} ${page.h}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>`)
add(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`)
add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')
add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>')

let pdf = '%PDF-1.4\n'
const offsets = [0]
for (let i = 0; i < objects.length; i += 1) {
  offsets.push(Buffer.byteLength(pdf))
  pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`
}
const xref = Buffer.byteLength(pdf)
pdf += `xref\n0 ${objects.length + 1}\n`
pdf += '0000000000 65535 f \n'
for (let i = 1; i < offsets.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`
writeFileSync(new URL('../public/resume.pdf', import.meta.url), pdf)
