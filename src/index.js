const {GraphQLServer} = require('graphql-yoga')

//define graphQL schema 
// ex one query type with String! (! means never null)

//dummy data 
let links = [{
    id: 'link-0',
    url: 'github.com/mritzing',
    description: 'Testing graphql server'
}]
let idCount = links.length
//implementation of graphql schema 
/*** ex queries / mutations
query{
    link (id: 2){
        id 
        url
        description
    }
}

mutation {
  post(
    url: "google.com"
    description: "dfasdfsfds"
  ) {
    id
  }
}


 */
const resolvers = {
    Query: {
        info: () => 'API of test graphql server',
        feed: () => links,
        link: (parent, args) =>links[args.id],
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            const link = {
                id: `link-${args.id}`,
                description: args.description,
                url: args.url,
            }
            links[args.id] = link
            return link
        },
        deleteLink: (parents, args) => {
            const delLink = links[args.id]
            links.splice(args.id, 1)
            return delLink
        }
    }
}

// makes server
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))

