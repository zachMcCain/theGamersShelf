const neo4j = require('neo4j-driver')

const driver = neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASS))
const session = driver.session()

module.exports.session = session;




// const personName = 'Alice'

// try {
//   const result = await session.run(
//     'CREATE (a:Person {name: $name}) RETURN a',
//     { name: personName }
//   )

//   const singleRecord = result.records[0]
//   const node = singleRecord.get(0)

//   console.log(node.properties.name)
// } finally {
//   await session.close()
// }

// on application exit:
// await driver.close()