import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  doc,
  onSnapshot,
  setDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { Grid, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function CandidateJobs() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [allJobs, setAllJobs] = useState(null);

  const fetchJobs = async () => {
    try {
      const q = await query(collection(db, "jobsData"));
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

  const applyForJob = async (job) => {
    //application id
    //job id
    //candidate id
    // status
    const applicationId = uuidv4();
    // console.log(job, "job");
    //  fetch the applications with candidate id 
    //  if job id is present in the applications then shw alert already applied
    // else apply for the job

    const q = await query(
      collection(db, "applications"),
      where("candidateId", "==", userInfo.uid)
    );
    let data = []; // will have all the applications of the candidate with candidate id
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      data.push(doc.data());
    });

    const isApplied = data.find((item) => item.jobId === job.Job_id);

    if (isApplied) {
      alert("already applied");
      return;
    } else {
      try {
        await setDoc(doc(db, "applications", applicationId), {
          applicationId,
          jobId: job.Job_id,
          employerId: job.employerId,
          title: job.title,
          location: job.location,
          createdAt: new Date(),
          candidateId: userInfo.uid,
          status: "applied",
          candidate_name:userInfo.displayName,
          company_name:job.employer_name,
          candidate_email:userInfo.email,
          // candidate_experience:userInfo.experience,
        });

        alert("applied sucessfully");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      {allJobs && allJobs.length > 0 ? (
        <div style={{}}>
          {allJobs.map((job) => {
            return (
              <Grid
                sx={{
                  maxWidth: "600px",
                  width: "90%",
                  margin: "auto",
                  padding: "10px",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
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
                  {job.description}
                </Grid>
                <Grid item xs={12}>
                  <label>Skills</label>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {job.skills.map((skill) => {
                      return <div>{skill}</div>;
                    })}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={() => applyForJob(job)} variant="contained">
                    Apply
                  </Button>
                </Grid>
              </Grid>
            );
          })}
        </div>
      ) : allJobs && allJobs.length === 0 ? (
        <div>no data</div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
export default CandidateJobs;
