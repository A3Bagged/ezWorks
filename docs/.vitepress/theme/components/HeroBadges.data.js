const emptyRelease = {
  version: null,
  releaseUrl: null
}

export default {
  async load() {
    try {
      const response = await fetch(
        'https://api.github.com/repos/A3Bagged/K1V/releases/latest',
        {
          headers: {
            Accept: 'application/vnd.github+json'
          }
        }
      )

      if (!response.ok) {
        return emptyRelease
      }

      const release = await response.json()

      return {
        version: release.tag_name ?? null,
        releaseUrl: release.html_url ?? null
      }
    } catch {
      return emptyRelease
    }
  }
}