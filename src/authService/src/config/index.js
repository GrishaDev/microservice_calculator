module.exports = { 
    env: process.env.NODE_ENV,
    authPort: process.env.AUTH_PORT,
    jwtSecret: process.env.JWT_SECRET,
    tokenDuration: process.env.JWT_DURATION
}