const { GraphQLServer} = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
    Query: {
        info: () => 'Thwis is the api of a hackernews clone',
        feed: (root, args, context, info) => {
            return context.prisma.links()
        },
        link: (parent, args) => {
            return links.find( link => link.id === args.id)
        }
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description
            })
        },
        updateLink: (parent, args) => {
            let linkToUpdate = links.find( link => link.id === args.id)
            if(linkToUpdate) {
                linkToUpdate = {
                    id: linkToUpdate.id,
                    url: args.url ? args.url : linkToUpdate.url,
                    description: args.description ? args.description : linkToUpdate.description
                }
                return linkToUpdate
            }
            else return null;
        },
        deleteLink: (parent, args) => {
            let index = links.findIndex( link => link.id === args.id)
            if(index !== -1) links.splice(index, 1)
            return links;
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {prisma}
})

server.start(() => console.log('Server is up and running on localhost 4000'))