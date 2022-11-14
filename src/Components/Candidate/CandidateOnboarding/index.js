import React from "react";
import {
  Grid,
  Button,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Box
} from "@mui/material";
import {  setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
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

function CandidateOnboarding() {
  const theme = useTheme();
  const navigate = useNavigate();
  const userData=JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    email: userData?.email?userData.email:"null check",
    phone: "",
    skills: [],
    experience: "",
    education: "",
    domain: "",
  });
  const submitUserInfo = async(e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "userData", userData.uid), {
        ...userInfo,
        type: "candidate",
      });
      alert('sucessfully submitted')
      navigate('/candidate/profile')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log("submit", userInfo);
  };
  const handleSkillChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserInfo(
      {...userInfo,
        skills: typeof value === 'string' ? value.split(',') : value,
      }
    );
  };
  return (
    <form
    onSubmit={submitUserInfo}
    >
      <h1>Candidate Onboarding</h1>
    <Grid
      container
      spacing={2}
      sx={{
        padding: "10px",
        maxWidth: "95%",
        margin: "20px auto",
        backgroundColor: "#fff",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
        borderRadius: "8px",
      }}
    >
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Name</Typography>
        <TextField
          required
          variant="outlined"
          fullWidth
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">email</Typography>
        <TextField
          required
          disabled
          type='email'
          variant="outlined"
          fullWidth
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">phone</Typography>
        <TextField
          type='number'
          variant="outlined"
          fullWidth
          value={userInfo.phone}
          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Experience</Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={userInfo.experience}
          onChange={(e) =>
            setUserInfo({ ...userInfo, experience: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">education</Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={userInfo.education}
          onChange={(e) =>
            setUserInfo({ ...userInfo, education: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Domain</Typography>
        <FormControl fullWidth>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userInfo.domain}
            onChange={(e) =>
              setUserInfo({ ...userInfo, domain: e.target.value })
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
          id="demo-multiple-chip"
          multiple
          required
          value={userInfo.skills}
          onChange={handleSkillChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
              style={getStyles(skill,userInfo.skills, theme)}
            >
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
        >Submit</Button>
      </Grid>
    </Grid>
    </form>
  );
}

export default CandidateOnboarding;

//fields
// name
// email
// phone
//skills []
//experience
//education
// domain
