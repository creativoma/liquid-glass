import { useEffect, useState } from 'react'

interface Stats {
  weeklyDownloads: number | null
  stars: number | null
}

/** Live npm weekly downloads + GitHub stars; both stay null if the request fails */
export const useStats = (): Stats => {
  const [stats, setStats] = useState<Stats>({
    weeklyDownloads: null,
    stars: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    fetch(
      'https://api.npmjs.org/downloads/point/last-week/@creativoma/liquid-glass',
      { signal: controller.signal }
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (typeof data?.downloads === 'number') {
          setStats((s) => ({ ...s, weeklyDownloads: data.downloads }))
        }
      })
      .catch(() => {})

    fetch('https://api.github.com/repos/creativoma/liquid-glass', {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (typeof data?.stargazers_count === 'number') {
          setStats((s) => ({ ...s, stars: data.stargazers_count }))
        }
      })
      .catch(() => {})

    return () => controller.abort()
  }, [])

  return stats
}
