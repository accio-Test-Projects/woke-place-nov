import { Grid, TextField, Button } from "@mui/material";
import React from "react";

function MessageArea() {
  return (
    <Grid container>
      <Grid item xs={12}>
        messages
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
            fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Button>send</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MessageArea;
