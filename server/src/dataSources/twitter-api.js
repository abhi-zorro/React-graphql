const { RESTDataSource } = require('apollo-datasource-rest');

class TwitterAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3005';
    }

    getUsers() {
        return this.get('users');
    }

    getTweets() {
        return this.get('tweets');
    }

    getTweetById(id) {
        return this.get(`tweets/${id}`);
    }

    getUserById(id) {
        return this.get(`users/${id}`);
    }

    incrementViews(id) {
        return this.patch(`tweets/${id}`, {
            id: id,
            stats
        });
    }

    createTweet(body) {
        return this.post(`tweets/`, { body });
    }

    deleteTweet(id) {
        return this.delete(`tweets/${id}`);
    }
}

module.exports = TwitterAPI;