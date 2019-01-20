const { GraphQLServer} = require('graphql-yoga')

//Dummy Data 
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]


let idCount = links.length
const resolvers = {
    Query: {
        info: () => 'Thwis is the api of a hackernews clone',
        feed: () => links
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => console.log('Server is up and running on localhost 4000'))