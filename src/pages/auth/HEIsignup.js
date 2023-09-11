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
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import SchoolIcon from '@mui/icons-material/School';
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

export default function HeiSignUp() {
	const [email, setemail] = useState('');
	const [CollageName, setCollageName] = useState('');
	const [mobile, setmobile] = useState('');
	const [address, setaddress] = useState('');
	const [instagram,setinstagram] =useState('');
	 const[linkedin,setlinkedin] =useState('');
	 const[facebook,setfacebook] =useState('');
	 const[website,setwebsite] =useState('');
	const handleSubmit = async (e) => {
		e.preventDefault();
		const body1 = {
			email,
		CollageName,
		mobile,
		address,
		instagram,
		website,
		linkedin,
		facebook
		};
		  
		 
		console.log(body1); 

		const result = await fetch(
			'http://localhost:3000/Fasignup/user',
			{
			  method: "POST",
			  body: JSON.stringify(body1),
			  headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			  },
			}
		  );
		  const data = await result.json();
		  console.log(data);
		  localStorage.setItem("userId", data.data.userId);
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
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' , fontSize: 50 }}>
						< SchoolIcon    sx ={{fontSize: 40 }} />
					</Avatar>
					<Typography variant="h3" alignContent="left" align="centre" sx={{ mt: 1, mb: 1 }}></Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} margin ={2}>
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
								<Grid item xs={10} sm={5}>
									College name:
									<TextField name="CollegeName" required fullWidth id="firstName" label="First Name" onChange={(e) => setCollageName(e.target.value)}>
										Name
									</TextField>
								</Grid>
								<Grid item xs={7} sm={5}>
									Collage official email :
									<TextField id="email" label="email" variant="outlined" type=" email" fullWidth required  onChange={(e) => setemail(e.target.value)}/>
								</Grid>
								<Grid item xs={7} sm={5}>
									Address line 1:
									<TextField id="address" label="adress" variant="outlined" fullWidth required  onChange={(e) => setaddress(e.target.value)}/>
								</Grid>
								<Grid item xs={7} sm={5}>
									Address Line 2 :
									<TextField id="address2" label=" address2" variant="outlined" fullWidth required />
								</Grid>								 
								<Grid item xs={7} sm={5}>
									Address Line 3 (State):
									<TextField id="website" label="website" variant="outlined" type=" website" fullWidth required />
								</Grid>
								<Grid item xs={7} sm={5}>
									Website:
									<TextField id="website" label="website" variant="outlined" type=" url" fullWidth required onChange={(e) => setwebsite(e.target.value)}/>
								</Grid>
								 
								 
								 
							</Grid>
							<Typography variant="h4" alignContent="left" align="centre" sx={{ mt: 1, mb: 1 }}>
								Contacts :
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={7} sm={5}>
									Landline :
									<TextField id="Landline" label="landline" variant="outlined" fullWidth />
								</Grid>
								<Grid item xs={7} sm={5}>
									Mobile:
									<TextField id="heimobile" label=" heimobile" variant="outlined" fullWidth  onChange={(e) => setmobile(e.target.value)}/>
								</Grid>
								 
							</Grid>

							<Typography variant="h4" alignContent="left" align="centre" sx={{ mt: 1, mb: 1 }}>
								Social handle:
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={7} sm={5}>
									Instagram :
									<TextField id="instagram" label=" instagram" variant="outlined" fullWidth  onChange={(e) => setinstagram(e.target.value)}/>
								</Grid>
								<Grid item xs={7} sm={5}>
									Facebook :
									<TextField id="facebook" label=" facebook" variant="outlined" fullWidth  onChange={(e) => setfacebook(e.target.value)}/>
								</Grid>
								<Grid item xs={7} sm={5}>
									LinkedIn:
									<TextField id="linkedin" label=" linkedin" variant="outlined" type=" email" fullWidth onChange={(e) => setlinkedin(e.target.value)}/>
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
