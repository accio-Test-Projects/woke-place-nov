import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { Grid, Button } from "@mui/material";

function Sidebar({ selectAJob }) {
  const [allJobs, setAllJobs] = useState(null);
  const fetchJobs = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const employerId = userInfo.uid;

    try {
      const q = await query(
        collection(db, "jobsData"),
        where("employerId", "==", employerId),
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const jobs = [];
        console.log(querySnapshot, "querySnapshot");
        querySnapshot.forEach((doc) => {
          jobs.push(doc.data());
        });
        setAllJobs(jobs);
        console.log("Current Jobs: ", jobs);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Button onClick={() => selectAJob(null)}>post a job</Button>
      {allJobs && allJobs.length > 0 ? (
        <div>
          {" "}
          {allJobs.map((job) => {
            return (
              <Grid
                onClick={() => selectAJob(job)}
                key={job.Job_id}
                sx={{
                  padding: "10px",
                  margin: "10px",
                  border: "1px solid",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
                container
              >
                <Grid item xs={12}>
                  {job.title}
                </Grid>
                <Grid item xs={12}>
                  {job.location}
                </Grid>
                <Grid item xs={12}>
                  {job.jobType}
                </Grid>
              </Grid>
            );
          })}
        </div>
      ) : allJobs && allJobs.length === 0 ? (
        <div>
          <h1>No Jobs Posted</h1>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default Sidebar;
