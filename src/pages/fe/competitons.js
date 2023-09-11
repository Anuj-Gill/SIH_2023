import { CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useFetch } from 'usehooks-ts'
import React from 'react'
 export default function Competitions(){
    const [isFormSubmitted, setisFormSubmitted] = useState(false);
    const [submit,handleSubmit] =useState(false);
  
    
   

    return(
        <Container component="main" maxWidth="xl">
            <CssBaseline/>
            <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
           {
            isFormSubmitted?(<div style={{ width: "100%", height: 450, display: "grid", placeItems: "center" }}>
            <Card sx={{ p: 4 }}>
              <Container
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  width: 450,
                }}>
                <CheckCircleIcon sx={{ color: "#22BB33", fontSize: 120 }} />
                <Typography variant="h5" component="div" style={{ fontWeight: 600, fontSize: 25 }}>
                  Grievance Submitted Successfuly
                </Typography>
                <Typography variant="body2" style={{ textAlign: "center" }} color="text.secondary">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis fugiat rem debitis ipsa fugit
                  hic minus
                </Typography>
              </Container>
            </Card>
          </div>):(<Card sx={{ p: 3 }} style={{ width: "100%" }}>
            <Typography variant='h4' fontWeight={600} textAlign="left" style={{ fontSize: 22 }}> Competitions</Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
              <Grid spacing={3}>
              <Grid item xs={12}>
                <TextField variant='outline' label ='Title' />
              </Grid>
              <Grid item xs={12}>
              <TextField required fullWidth label="Description" multiline rows={3} />
              </Grid>
              <Grid item xs={12}>
              <TextField
                    id="outlined-number"
                    label="Teamsize"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    //onChange={(e) => setteamsize(e.target.value)}
                  />
              </Grid>
              
              </Grid>

            </Box>
          </Card>)
           }
        </Box>
            </Container>
    );
 }