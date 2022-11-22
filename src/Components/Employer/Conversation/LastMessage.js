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
function LastMessage({ selectAConversation }) {
  return (
    <div>
      {mock.map((item) => {
        return (
          <Grid
            onClick={() => selectAConversation(item)}
            sx={{
              padding: "10px",
              margin: "10px",
              textAlign: "left",
            }}
            container
            key={item.id}
          >
            <Grid item xs={9}>
              {item.name}
            </Grid>
            <Grid item xs={3}>
              {item.time}
            </Grid>
            <Grid item xs={12}>
              {item.lastMessage}
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}

export default LastMessage;
