const neo4j = require('neo4j-driver')

const driver = neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASS))
const session = driver.session()

module.exports = session;