interface Options {
  uniqueTokenPerInterval?: number
  interval?: number
}

export function rateLimit(options: Options) {
  const tokenCache = new Map()

  return {
    check: (limit: number, token: string) =>
      new Promise<{ success: boolean; limit: number; remaining: number }>((resolve) => {
        const tokenCount = tokenCache.get(token) || [0]
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount)
        }
        tokenCount[0] += 1

        const currentUsage = tokenCount[0]
        const isRateLimited = currentUsage >= limit

        resolve({
          success: !isRateLimited,
          limit,
          remaining: isRateLimited ? 0 : limit - currentUsage,
        })
      }),
  }
}
