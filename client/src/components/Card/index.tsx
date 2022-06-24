import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import TwitterIcon from "@mui/icons-material/Twitter";
import Typography from "@mui/material/Typography";

const Card = ({ tweet }: any) => {
  console.log(tweet);
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar sx={{ backgroundColor: "white" }}>
          <TwitterIcon color="primary" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        sx={{ textAlign: "justify" }}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {tweet.author.full_name}
              <Typography
                sx={{ display: "inline", marginLeft: "350px" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {tweet.date}
              </Typography>
            </Typography>

            {tweet.body}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default Card;
