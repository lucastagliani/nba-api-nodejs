import mcache from 'memory-cache'

const DEFAULT_CACHE_TIME_IN_SECONDS = 10 * 60

export const cache = (durationInSeconds = DEFAULT_CACHE_TIME_IN_SECONDS) => (req, res, next) => {
  const key = `__express__${req.originalUrl}` || req.url
  const cachedBody = mcache.get(key)
  if (cachedBody) {
    console.log(`Got ${key} from cache.`)
    res.send(cachedBody)
  } else {
    console.log(`Caching ${key}...`)
    res.sendResponse = res.send
    res.send = (body) => {
      mcache.put(key, body, durationInSeconds * 1000)
      res.sendResponse(body)
    }
    next()
  }
}
