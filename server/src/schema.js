const { gql } = require('apollo-server');


const typeDefs = gql`
    scalar Date
    type Tweet {
    id: ID!
    # The tweet text. No more than 140 characters!
    body: String
    # When the tweet was published
    date: Date 
    # Who published the tweet
    author: User
    # Views, retweets, likes, etc
    stats: Stat
    }
    
    scalar Url

    type User {
        id: ID!
        username: String
        first_name: String
        last_name: String
        full_name: String
        avatar_url: Url
    }

    type Stat {
        views: Int
        likes: Int
        retweets: Int
        responses: Int
    }

    type Notification {
        id: ID
        date: Date
        type: String
    }

    type User {
        id: ID!
        name: String!
    }

    type AuthResponse {
        token: String!
    }

    type Meta {
        count: Int
    }

    type Query {
        AllTweets(limit: Int, skip: Int, sort_field:   String, sort_order: String): [Tweet]
        AllUsers: [User]
        Tweet(id: ID!): Tweet
        TweetsMeta: Meta
        users: [String]
        User(id: ID!): User
        Notifications(limit: Int): [Notification]
        NotificationsMeta: Meta
    }

    type MutateReponse {
        code: Int
        message: String
    }

    type Mutation {
        createTweet (
            body: String
        ): Tweet
        deleteTweet(id: ID!): MutateReponse
        markTweetRead(id: ID!): Boolean
        login(email: String!, password: String!): AuthResponse!
    }

`;



module.exports = typeDefs