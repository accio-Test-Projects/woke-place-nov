import {
  FormControl,
  Grid,
  TextField,
  Select,
  Typography,
  Box,
  Chip,
  MenuItem,
  OutlinedInput,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import {
  setDoc,
  doc,
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/material/styles";

const domains = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Devops",
  "UI/UX",
  "QA",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Cloud Computing",
  "Blockchain",
  "Softwere Engineer",
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Redux",
  "Node",
  "Express",
  "MongoDB",
  "SQL",
  "Python",
  "Java",
  "C++",
];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Jobform({ postAjob, jobData, setJobData }) {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const theme = useTheme();

  const handleSkillChange = (event) => {
    const {
      target: { value },
    } = event;
    setJobData({
      ...jobData,
      skills: typeof value === "string" ? value.split(",") : value,
    });
  };

  const submitJob = async (e) => {
    e.preventDefault();

    const Job_id = uuidv4();

    try {
      if (jobData.Job_id) {
        //update

        await setDoc(doc(db, "jobsData", jobData.Job_id), {
          ...jobData,
        });
        //setDoc(doc,data)
        // doc (db,'collection_name','doc_id')
      } else {
        //create

        await setDoc(doc(db, "jobsData", Job_id), {
          Job_id: Job_id,
          ...jobData,
          employerId: userInfo.uid,
          createdAt: new Date(),
          employer_name: userInfo.displayName,
        });
      }
      alert("Job Posted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return postAjob ? (
    <form onSubmit={(e) => submitJob(e)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Jobform</h1>
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>Job title</label>
          <TextField
            required
            value={jobData.title}
            onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>location</label>
          <TextField
            required
            value={jobData.location}
            onChange={(e) =>
              setJobData({ ...jobData, location: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>salary</label>
          <TextField
            required
            value={jobData.salary}
            onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>experience</label>
          <TextField
            required
            value={jobData.experience}
            onChange={(e) =>
              setJobData({ ...jobData, experience: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>Job Type</label>
          <TextField
            required
            value={jobData.jobType}
            onChange={(e) =>
              setJobData({ ...jobData, jobType: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <label>Discription</label>
          <TextField
            required
            multiline
            rows={4}
            value={jobData.description}
            onChange={(e) =>
              setJobData({ ...jobData, description: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Domain</Typography>
          <FormControl fullWidth>
            <Select
              // disabled={!edit}
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={jobData.domain}
              onChange={(e) =>
                setJobData({ ...jobData, domain: e.target.value })
              }
            >
              {domains.map((domain, index) => {
                return (
                  <MenuItem key={index} value={domain}>
                    {domain}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Skills</Typography>
          <FormControl sx={{ m: 1, width: 300 }}>
            <Select
              fullWidth
              // disabled={!edit}
              id="demo-multiple-chip"
              multiple
              required
              value={jobData.skills}
              onChange={handleSkillChange}
              input={
                <OutlinedInput
                  fullWidth
                  id="select-multiple-chip"
                  label="Chip"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {skills.map((skill) => (
                <MenuItem
                  key={skill}
                  value={skill}
                  style={getStyles(skill, jobData.skills, theme)}
                >
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  ) : (
    <div>please select a job</div>
  );
}

export default Jobform;
