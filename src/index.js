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
        feed: () => links,
        link: (parent, args) => {
            return links.find( link => link.id === args.id)
        }
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
    resolvers
})

server.start(() => console.log('Server is up and running on localhost 4000'))