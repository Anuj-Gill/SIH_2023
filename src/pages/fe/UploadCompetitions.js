import { Button, Divider, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { TextareaAutosize } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/system/Stack";
import "./uploadproject.css";
import axios from "axios";

export default function UploadCompetition() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [Date, setDate] = useState("");
  const [stream, setstream] = useState("");
  const[teamSize,setteamSize] = useState("");
  const[fundingLimit,setfundingLimit]= useState("");
  const[isFormSubmitted,setisFormSubmitted] =useState(false);
  const[status,setstatus]=useState(false)
  const handlesubmit = async (e) => {
    e.preventDefault();
    const body = {
      title,
      description,
      Date,
      teamSize,
      stream,
      fundingLimit,
      status,
    };
    const res= axios.post('http://localhost:4000/api/competition', {
      body
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(body);
  };
  {
    return (
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          width: 700,
        }}>
        <Box>
          <Paper elevation={12} className="paper">
            
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
                
              <Typography variant="h3">Upload Competitions</Typography>
            </Box>

            <Divider />
              

            <Box sx={{ mt: 3 }} margin={2} alignItems="right">
              <Grid spacing={4}>
                <Grid item gap={2}>
                  <TextField
                    id="name"
                    variant="outlined"
                    fullWidth
                    label="Title"
                    onChange={(e) => settitle(e.target.value)}
                    style={{
                      margin: 12,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                <TextField
                  required
                  fullWidth
                  label="Description"
                  multiline
                  style={{
                    margin: 12,
                  }}
                  rows={4}
                  onChange={(e) => setdescription(e.target.value)}
                />
              </Grid>
              <Stack
                direction="row"
                spacing={3}
                style={{
                  margin: 12,
                }}>
                <Grid item gap={2}>
                  <Grid item></Grid>
                  <TextField
                    id="outlined-number"
                    label="Team size"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{
                      margin: 12,
                    }}
                    onChange ={(e)=>setteamSize(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="date"
                    label="Deadline"
                    type="date"
                    style={{
                      margin: 12,
                    }}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  onChange={(e)=>e.target.value}
                   />
                </Grid>
                <Grid item>
                  <TextField required id="outlined-required" label="funding limit" onChange={(e)=>setfundingLimit(e.target.value)} />
                </Grid> 
              </Stack>
              <FormControl style={{ width: 150, margin: 10 }}>
                <InputLabel>Stream</InputLabel>
                <Select  fullWidth onChange={(e) => setstream(e.target.value)}  value={stream} label ="stream"required>
                  <MenuItem value="Arts">Arts</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="commerce">Commerce</MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="medicine">medicine</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button variant="contained" type="submit" onClick={handlesubmit}>
              Submit{" "}
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }
}
