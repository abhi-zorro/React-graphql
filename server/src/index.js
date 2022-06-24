const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { validateToken } = require("./auth-service");

const TwitterAPI = require('./dataSources/twitter-api');


const context = ({ req }) => {
    if (req.body.query.match("Login")) return {};

    const authorizationHeader = req.headers.authorization || '';
    console.log("Auth token: " + authorizationHeader)
    const token = authorizationHeader.split(' ')[1];

    if (!token) throw new Error("Authentication token is required buddy.");

    const user = validateToken(token);

    return { user };
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            twitterAPI: new TwitterAPI(),
        };
    },
    context,
    playground: false
});

server.listen().then(() => {
    console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});
