import React from "react";
import { useQuery, gql } from "@apollo/client";
import TweetCard from "../../Card";
import QueryResult from "../../Spinner/query-result";
import { Paper } from "@mui/material";

// gql query
const TWEETS = gql`
  query getAllTweets {
    AllTweets {
      id
      body
      author {
        full_name
      }
      date
    }
  }
`;

const Tweets = () => {
  const { loading, error, data } = useQuery(TWEETS);
  console.log("Data is " + data);
  return (
    <Paper>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.AllTweets?.map((tweet: any, index: any) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </QueryResult>
    </Paper>
  );
};

export default Tweets;
