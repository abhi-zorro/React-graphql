const { AuthenticationError } = require('apollo-server');
const { GraphQLScalarType, Kind } = require('graphql');
const { authenticate } = require('./auth-service');
const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',

    serialize(value) {
        return value; // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});

const resolvers = {
    Date: dateScalar,
    Query: {
        //get all tweets
        AllTweets: async (_, { limit, skip, sort_field, sort_order }, { dataSources }) => {
            const data = await dataSources.twitterAPI.getTweets();
            return data.slice(0, limit);
        },

        //get all users
        AllUsers: (_, __, { dataSources, user }) => {
            console.log("user details: " + user.roles);
            return dataSources.twitterAPI.getUsers();
        },

        //retrieve Tweet using id
        Tweet: (_, { id }, { dataSources }) => {
            return dataSources.twitterAPI.getTweetById(id);
        },

        //retrieve user by id
        User: (_, { id }, { dataSources }) => {
            return dataSources.twitterAPI.getUserById(id);
        },

        //display TweetsMeta
        TweetsMeta: (_, __, { dataSources }) => {
            const count = 0;
            dataSources.twitterAPI.getTweets();
            console.log(count);
            return count;
        },
    },
    Mutation: {
        markTweetRead: async (_, { id }, { dataSources, user }) => {
            try {
                const email = await user;
                console.log(email);
                return dataSources.twitterAPI.incrementViews(id);
            }
            catch (e) {
                throw new AuthenticationError('You must be logged in to do this');
            }
        },

        createTweet: (_, { body }, { dataSources }) => {
            return dataSources.twitterAPI.createTweet(body);
        },

        deleteTweet: async (_, { id }, { dataSources }, { user }) => {
            try {
                const email = await user;
                console.log("email: " + email);
                dataSources.twitterAPI.deleteTweet(id);
                return {
                    code: 200,
                    message: "Deleted"
                }
            }
            catch (e) {
                throw new AuthenticationError('You must be logged');
            }
        },

        login: (_parent, args, context, _info) => {
            const { email, password } = args;
            console.log(context)
            const token = authenticate(email, password);
            return { token };
        }
    }
}

module.exports = resolvers;