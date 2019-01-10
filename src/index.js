const {GraphQLServer} = require('graphql-yoga')

//define graphQL schema 
// ex one query type with String! (! means never null)
const typeDefs = `
type Query {
    info: String!
    feed: [Link!]!
}

type Mutation {
    post(url: String!, description: String!): Link!
}
type Link {
    id: ID!
    description: String!
    url: String!
}
`
//dummy data 
let links = [{
    id: 'link-0',
    url: 'github.com/mritzing',
    description: 'Testing graphql server'
}]
//implementation of graphql schema 
const resolvers = {
    Query: {
        info: () => 'API of test graphql server',
        feed: () => links,
    },

    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

// makes server
const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))

