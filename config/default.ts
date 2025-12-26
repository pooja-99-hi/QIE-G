export default {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
  },
  database: {
    url: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
  },
  redis: {
    url: process.env.REDIS_URL,
    ttl: 300, // 5 minutes
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpire: '15m',
    refreshExpire: '7d',
  },
  blockchain: {
    qie: {
      rpcUrl: process.env.QIE_RPC_URL || 'https://rpc.qie.network',
      chainId: 12345,
      explorer: 'https://explorer.qie.network',
    },
  },
  security: {
    bcryptRounds: 12,
    maxLoginAttempts: 5,
    lockoutDuration: 900000, // 15 minutes
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  },
}