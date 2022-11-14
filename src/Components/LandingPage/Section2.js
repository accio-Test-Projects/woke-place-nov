import { Grid, Typography } from "@mui/material";
import React from "react";
import img from "../..//assets/Vector.png";
import Card from "../common/Card";
const cards = [
  {
    title: "Find the right candidate",
    avalableJobs: 100,
    img: img,
  },
  {
    title: "Find the right candidate",
    avalableJobs: 100,
    img: img,
  },
  {
    title: "Find the right candidate",
    avalableJobs: 100,
    img: img,
  },
  {
    title: "Find the right candidate",
    avalableJobs: 100,
    img: img,
  },
  {
    title: "Find the right candidate",
    avalableJobs: 100,
    img: img,
  },
  {
    title: "Find the right candidate",
    avalableJobs: 100,
    img: img,
  },
  {
    title: "Find the right candidate",
    avalableJobs: 100,
    img: img,
  },
  {
    title: "Find the right candidate",
    avalableJobs: 100,
    img: img,
  },
];

function Section2() {
  return (
    <Grid container>
      <Typography variant="h4" sx={{ fontWeight: 700, textAlig: "center" }}>
        One Platform Many Solutions
      </Typography>
      <Grid
        container
        sx={{
          margin: "auto",
          justifyContent: "center",
        }}
      >
        {cards.map((card, i) => {
          return <Card key={i} card={card} />;
        })}
      </Grid>
    </Grid>
  );
}

export default Section2;
