import { Grid, TextField, Button } from "@mui/material";
import React from "react";

function MessageArea({ allConversations,postMessage }) {
  const [message, setMessage] = React.useState("");
  return (
    <div>
      {allConversations ? (
        <Grid container>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            item
            xs={12}
          >
            {allConversations.map((item) => {
              return (
                <div
                  style={{
                    background: "#EAEAEA",
                    borderRadius: "0px 16px 16px 16px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                  key={item.conversationId}
                >
                  <div>{item.message}</div>
                  <div>{"time"}</div>
                </div>
              );
            })}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              // position: "absolute",
              bottom: "100px",
              width: "100%",
            }}
          >
            <Grid container>
              <Grid item xs={10}>
                <TextField 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth />
              </Grid>
              <Grid item xs={2}>
                <Button
                onClick={()=>postMessage(message)}
                >send</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div>please select a conversation</div>
      )}
    </div>
  );
}

export default MessageArea;
