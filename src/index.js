const {GraphQLServer} = require('graphql-yoga');
const {prisma} = require('./generated/prisma-client');

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
        feed: (root, args, context, info) => {
            return context.prisma.links();
        },
        //link: (parent, args) =>links[args.id],
    },
    Mutation: {
        post: (parent, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            });
        },
        /**
        updateLink: (parent, args) => {
            const link = {
                id: `link-${args.id}`,
                description: args.description,
                url: args.url,
            };
            links[args.id] = link;
            return link;
        },
        deleteLink: (parents, args) => {
            const delLink = links[args.id]
            links.splice(args.id, 1);
            return delLink;
        }
         */
    }
};

// makes server
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {prisma},
});

server.start(() => console.log(`Server is running on http://localhost:4000`));

