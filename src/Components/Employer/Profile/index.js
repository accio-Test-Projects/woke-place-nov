import React, { useEffect } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
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
function EmployerProfile() {
  const navigate = useNavigate();
  const[loading, setLoading] = React.useState(true);
  const [edit, setEdit] = React.useState(false);
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
  const saveInfo = async () => {
    try {
      await setDoc(
        doc(db, "userData", userData.uid),
        {
          ...userInfo,
        },
        { merge: true }
      );
      alert("sucessfully updated");
      setEdit(false);
    } catch (err) {
      console.log(err);
    }
  };
  async function fetchUserInfo() {
    try {
      const docRef = doc(db, "userData", userData.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserInfo(docSnap.data());
        setLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

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
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <form>
          <h1>Employer profile</h1>
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
              disabled={!edit}
                required
                variant="outlined"
                fullWidth
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">email</Typography>
              <TextField
              disabled={true}
                required
                
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
              disabled={!edit}
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
              disabled={!edit}
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
              disabled={!edit}
                variant="outlined"
                fullWidth
                value={userInfo.education}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, size: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">hr email</Typography>
              <TextField
                variant="outlined"
                fullWidth
                disabled={!edit}
                value={userInfo.hrEmail}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, hrEmail: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">company address</Typography>
              <TextField
              disabled={!edit}
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
                disabled={!edit}
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

           
          </Grid>
          {edit ? (
            <div>
              <Button variant="contained" onClick={saveInfo}>
                Save
              </Button>
              <Button variant="contained" onClick={() => setEdit(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="contained" onClick={() => setEdit(true)}>
              Edit
            </Button>
          )}
        </form>
      )}
    </div>
  );
}

export default EmployerProfile;
