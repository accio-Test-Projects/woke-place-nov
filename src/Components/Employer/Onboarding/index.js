import React from "react";
import {  setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
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
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const industry = [
  "Agriculture",
  "Automotive",
  "Banking",
  "It & Software",
  "Construction",
];

function EmployerOnboarding() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    email: userData?.email ? userData.email : "",
    phone: "",
    size: "",
    companyName: "",
    hrEmail: "",
    address: "",
  });
  const submitUserInfo = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "userData", `${userData.uid}`), {
        ...userInfo,
        type: "employer",
      });
      alert('sucessfully submitted')
      navigate('/employer/profile')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log("submit", userInfo);
  };
  const handleSkillChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserInfo({
      ...userInfo,
      skills: typeof value === "string" ? value.split(",") : value,
    });
  };
  return (
    <form onSubmit={submitUserInfo}>
      <h1>Employer Onboarding</h1>
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
            type="email"
            variant="outlined"
            fullWidth
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">phone</Typography>
          <TextField
            type="number"
            variant="outlined"
            fullWidth
            value={userInfo.phone}
            onChange={(e) =>
              setUserInfo({ ...userInfo, phone: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">company name</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={userInfo.experience}
            onChange={(e) =>
              setUserInfo({ ...userInfo, companyName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">company size</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={userInfo.education}
            onChange={(e) => setUserInfo({ ...userInfo, size: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">hr email</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={userInfo.hrEmail}
            onChange={(e) =>
              setUserInfo({ ...userInfo, hrEmail: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">company address</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={userInfo.address}
            onChange={(e) =>
              setUserInfo({ ...userInfo, address: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Industry type</Typography>
          <FormControl fullWidth>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userInfo.industry}
              onChange={(e) =>
                setUserInfo({ ...userInfo, industry: e.target.value })
              }
            >
              {industry.map((ind, index) => {
                return (
                  <MenuItem key={index} value={ind}>
                    {ind}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit">Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EmployerOnboarding;
