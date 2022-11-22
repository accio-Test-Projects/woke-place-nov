import { Grid } from "@mui/material";
import React from "react";

const mock = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hello, I am John Doe",
    time: "12:00 PM",
  },
  {
    id: 109,
    name: "John Doe",
    lastMessage: "Hello, I am John Doe",
    time: "12:00 PM",
  },
  {
    id: 18909,
    name: "John Doe",
    lastMessage: "Hello, I am John Doe",
    time: "12:00 PM",
  },
  {
    id: 189,
    name: "John Doe",
    lastMessage: "Hello, I am John Doe",
    time: "12:00 PM",
  },
  {
    id: 10,
    name: "John Doe",
    lastMessage: "Hello, I am John Doe",
    time: "12:00 PM",
  },
  {
    id: 109,
    name: "John Doe",
    lastMessage: "Hello, I am John Doe",
    time: "12:00 PM",
  },
  {
    id: 1809,
    name: "John Doe",
    lastMessage: "Hello, I am John Doe",
    time: "11:00 PM",
  },

  {
    id: 190,
    name: "John Doe",
    lastMessage: "Hello, I am John Doe",
    time: "1:00 PM",
  },
];
function LastMessage({ allLastMessages, selectAConversation }) {
  return (
    <div>
      {allLastMessages && allLastMessages.length > 0 ? (
        <div>
          {allLastMessages.map((item) => {
            return (
              <Grid
                onClick={() => selectAConversation(item)}
                sx={{
                  padding: "10px",
                  margin: "10px",
                  textAlign: "left",
                }}
                container
                key={item.last_message_id}
              >
                <Grid item xs={9}>
                  {item.candidate_name}
                </Grid>
                <Grid item xs={3}>
                  {"item.createdAt"}
                </Grid>
                <Grid item xs={12}>
                  {item.last_message}
                </Grid>
              </Grid>
            );
          })}
        </div>
      ) : allLastMessages && allLastMessages.length === 0 ? (
        <div>no data</div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default LastMessage;
