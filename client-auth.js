const axios = require("axios");

axios.defaults.baseURL = "http://localhost:4000/";

axios.interceptors.request.use(
    (req) => {
        console.log("Request: " + req);
        return req;
    },
    (err) => {
        return Promise.reject(err);
    }
);

const login = async (email, password) => {
    const axiosResponse = await axios.post('/graphql', {
        query: `mutation Login {
      login(email: "${email}", password: "${password}") {
        token
      }
    }`
    });

    const graphqlQueryData = axiosResponse.data;
    const authenticationToken = graphqlQueryData.data.login.token;
    console.log("authentication token " + authenticationToken)

    axios.defaults.headers.common['Authorization'] = `Bearer ${authenticationToken}`;
}

const posts = async () => {
    const axiosResponse = await axios.post('/graphql', {
        query: `query GetAllUsers {
      AllUsers {
        full_name
      }
    }`
    });

    const graphqlQueryData = await axiosResponse.data;
    const posts = graphqlQueryData.data.AllUsers[0];
    return posts;
}

const main = async () => {
    await login("foo@example.com", "bar");
    const data = await posts();
}

main();