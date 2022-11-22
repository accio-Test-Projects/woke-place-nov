import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import LastMessage from "./LastMessage";
import MessageArea from "./MessageArea";

function Conversation() {
  const [lastMassageMobile, setLastMassageMobile] = useState(true);
  const selectAConversation = (data) => {
    console.log(data);
    setLastMassageMobile(false);
  };
  return (
    <Grid container>
      <Grid
        xs={12}
        sm={4}
        sx={{
          display: { xs: lastMassageMobile ? "block" : "none", sm: "block" },
        }}
      >
        <LastMessage selectAConversation={selectAConversation} />
      </Grid>
      <Grid
        xs={12}
        sm={8}
        sx={{
          display: { xs: lastMassageMobile ? "none" : "block", sm: "block" },
        }}
      >
        <Button onClick={() => setLastMassageMobile(true)}>back</Button>
        <MessageArea />
      </Grid>
    </Grid>
  );
}

export default Conversation;
