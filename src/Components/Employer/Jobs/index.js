import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Jobform from "./Jobform";
function Jobs() {
  const [postAjob, setPostAjob] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(true);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    experience: "",
    skills: [],
    jobType: "",
    domain: "",
  });

  const selectAJob = (data) => {

    setMobileSidebar(false);
    
    if (!data) {
      setJobData({
        title: "",
        description: "",
        location: "",
        salary: "",
        experience: "",
        skills: [],
        jobType: "",
        domain: "",
      });
      setPostAjob(true);
    } else {
      setJobData(data);
      setPostAjob(true);
    }
  };


  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={3} //40%
          sx={{
            display: { xs: mobileSidebar ? "block" : "none", sm: "block" },
          }}
        >
          <Sidebar selectAJob={selectAJob} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={9} //60%
          sx={{
            display: { xs: mobileSidebar ? "none" : "block", sm: "block" },
          }}
        >
          <Button
            sx={{
              display: { xs: "block", sm: "none" },
            }}
            onClick={() => setMobileSidebar(true)}
          >
            Back
          </Button>

          <Jobform
            jobData={jobData}
            setJobData={setJobData}
            postAjob={postAjob}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Jobs;
