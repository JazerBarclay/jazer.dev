const { Pool } = require('pg')

console.log(`Connected to ${process.env.DATABASE_URL}`)

const databaseConfig = { connectionString: process.env.DATABASE_URL }
const pool = new Pool(databaseConfig)

// pool.on('connect', () => {
//     console.log('Connected to the db')
// })

module.exports = pool