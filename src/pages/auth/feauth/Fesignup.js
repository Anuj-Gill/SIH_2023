import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import axios from 'axios';
// import PortalClickAway from '../../authentication/otpverify';
import BusinessIcon from '@mui/icons-material/Business';
const api = axios.create({});
function MatchPassword() {
	/* var password = document.getElementById("password");  
    var confirmPassword = document.getElementById("confirmpassword");  
    if(password != confirmPassword)  
    {   
       window.alert("Passwords did not match");  
    }*/
}
function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/"></Link> {new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function FaSignUp() {
	const [email, setemail] = useState('');
	const [name, setname] = useState('');
	const [mobile, setmobile] = useState('');
	const [states,setstates] =useState('');
	const [districts,setdistricts] =useState('');
	const [countries,setcountries] =useState('')

	const [address, setaddress] = useState('');
 const [control,setcontrol] = useState('');
	const handleSubmit = async (e) => {
		e.preventDefault();
		const body1 = {
			email,
		name,
		districts,
		states,
		control,
		countries,
		address,
	 
		};
		  
		 
		console.log(body1); 

		const result = await fetch(
		'http://localhost:4000/api/fundingAgency',
			{
			  method: "POST",
			  body: JSON.stringify(body1),
			  headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				// JWT:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoaW5tYXluYXBoYWRlMjNAZ21haWwuY29tIiwiaWF0IjoxNjYxMzQ4MzE5fQ.9xAFtayacFSdlrkxcCZqjv1L9cCPVe_xMxo4eINGpo8",
				Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoaW5tYXluYXBoYWRlMjNAZ21haWwuY29tIiwiaWF0IjoxNjYxMzQ4MzE5fQ.9xAFtayacFSdlrkxcCZqjv1L9cCPVe_xMxo4eINGpo8`,  
			},
			}
		  );
		  const data = await result.json();
		  console.log(data);
		 // localStorage.setItem("userId", data.data.userId);
		 // localStorage.setItem("role",data.data.body1);
		
	/* axios.post('http://localhost:4000/api/fundingAgency', {
			 data: body1
		  })
		  .then(function (response) {
			console.log(response);
		  })
		  .catch(function (error) {
			console.log(error);
		  });*/
		 };
 
 
	return (
		<ThemeProvider theme={theme}>
			<Container>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<BusinessIcon sx={{ fontSize: 40 }} />
					</Avatar>
					<Typography variant="h3" alignContent="left" align="centre" sx={{ mt: 1, mb: 1 }}></Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} margin={2}>
						<Grid container spacing={3}>
							{/*<Grid item xs={10} sm={5}>
								<TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name">
									Name
								</TextField>
							</Grid>
							<Grid item xs={10} sm={5}>
								<TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" />
							</Grid>

							<Grid item xs={10} sm={5}>
								<TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
								<Grid item xs={10} sm={5}>
									<Button variant="contained" sx={{ mt: 1, mb: 1 }}>
										verify
									</Button>
								</Grid>
							</Grid>
							<Grid item xs={10} sm={5}>
								<TextField required fullWidth id="mobile.no" label="mobile.no" name="mobil.no" />
								<Grid item xs={10} sm={5}>
									<Button variant="contained" sx={{ mt: 1, mb: 1 }}>
										verify
									</Button>
								</Grid>
							</Grid>

							<Grid item xs={5}>
								<TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
							</Grid>

							<Grid item xs={5}>
								<TextField required fullWidth name="confirmpassword" label="confirmPassword" type="confirmpassword" id="confirmpassword" />
				</Grid> */}

							<Typography variant="h3" alignContent="left" align="centre" sx={{ mt: 2, mb: 2 }}>
								Institue Information:
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={10} sm={5} style={{margin : 10}}>
									
									<TextField
										name="institutename"
										required
										fullWidth
										id="name"
										label=" Institute Name"
										onChange={(e) => setname(e.target.value)}>
										Name
									</TextField>
								</Grid>
								<Grid item xs={7} sm={5}>
									  
									<TextField
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										style={{margin : 10}}
										onChange={(e) => setemail(e.target.value)}
									/>
								</Grid>
								<Grid item xs={7} sm={5}>
									 
									<TextField
										id="address"
										label="address"
										variant="outlined"
										name="address"
										fullWidth
										required
										style={{margin : 10}}
										onChange={(e) => setaddress(e.target.value)}
									/>
								</Grid>
								<Grid item xs={7} sm={5}>
									
									<TextField required fullWidth id="address" label="district" name="district"  style={{margin : 10}} onChange={(e)=>setdistricts(e.target.value)} />
								</Grid>
								<Grid item xs={7} sm={5}>
									
									<TextField id="State" label=" State" variant="outlined" name="state" fullWidth onChange={(e)=>setstates(e.target.value)}  style={{margin : 10}} required />
								</Grid>
								<Grid item xs={7} sm={5}>
								 
									<TextField id="Country" label="Country" variant="outlined" fullWidth  style={{margin : 10}} onChange={(e)=>setcountries(e.target.value)} required />
								</Grid>
								<Grid item>
								<FormControl style={{ width: 150, margin: 10 }}  >
                <InputLabel>Select Roles</InputLabel>
                <Select  fullWidth onChange={(e) => setcontrol(e.target.value)} value={control} label ="Select Roles"required>
                  <MenuItem value="Employees">Employees</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                
                  
                </Select>
              </FormControl>
								</Grid>
							</Grid>
							<Typography variant="h4" alignContent="left" align="centre" sx={{ mt: 1, mb: 1 }}>
								Contacts :
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={7} sm={5}>
								
									<TextField id="landline" label="landline" name="landline" variant="outlined" fullWidth />
								</Grid>
								<Grid item xs={7} sm={5}>
									<TextField required fullWidth id="mobile.no" label="mobile.no" name="mobile.no" autoComplete="mobile.no" onClick={(e) => setmobile(e.target.value)} />
								</Grid>
							</Grid>

							 
						 

							<Button type="submit" variant="contained" sx={{ mt: 5, mb: 3 }} onClick={MatchPassword()}>
								Sign Up
							</Button>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}
