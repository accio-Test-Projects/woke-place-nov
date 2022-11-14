import { Grid, Typography } from '@mui/material'
import React from 'react'

function Card({card}) {
  return (
    <Grid
    sx={{
      display: "flex",
      background: "#FFFFFF",
      boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "20px",
      margin: "5px",
      padding: "20px 30px",
    }}
    item
    xs={6}
    md={2.5}
    lg={2.5}
  >
    <div>
      <img
        style={{ height: "45px", width: "45px" }}
        src={card.img}
        alt="img"
      />
    </div>
    <div>
      <Typography variant="h6">{card.title}</Typography>
      <Typography variant="h6">
        {card.avalableJobs} Jobs available
      </Typography>
    </div>
  </Grid>
  )
}

export default Card