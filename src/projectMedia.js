import catalog from 'virtual:project-media'

function isUrl(value) {
  return /^(https?:|data:|blob:|\/)/.test(value)
}

export function mediaUrl(folder, file) {
  if (!file) return ''
  if (typeof file !== 'string') return file
  if (isUrl(file)) return file
  if (folder) return `/projects/${folder}/${file}`
  return file
}

export function projectDemos(project) {
  const folder = project.demoFolder
  const listed = Array.isArray(project.demos) ? project.demos.filter((item) => item?.src || item?.file) : []

  if (listed.length) {
    return listed
      .map((item) => {
        const src = mediaUrl(folder, item.file || item.src)
        if (!src) return null
        return {
          src,
          alt: item.alt || project.title,
          caption: item.caption,
          type: item.type,
        }
      })
      .filter(Boolean)
  }

  if (folder && catalog[folder]?.length) {
    return catalog[folder].map((src) => {
      const name = src.split('/').pop()
      return {
        src,
        alt: project.title,
        caption: project.demoCaptions?.[name],
      }
    })
  }

  if (project.image) {
    return [
      {
        src: mediaUrl(folder, project.image),
        alt: project.imageAlt || project.title,
        caption: project.imageCaption,
      },
    ]
  }

  return []
}
