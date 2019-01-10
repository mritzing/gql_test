const {GraphQLServer} = require('graphql-yoga')

//define graphQL schema 
// ex one query type with String! (! means never null)
const typeDefs = `
type Query {
    info: String!
}
`
//implementation of graphql schema 
const resolvers = {
    Query: {
        info: () => null,
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))

