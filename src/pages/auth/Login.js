import Tabs from "@mui/material/Tabs";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/Appcontext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginUser } from "../../api/services/auth";
import { setStorage } from "../../utils/localstorage-utils";



const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();


  


  const login = (token) => {
    setIsLoggedIn(true);
    setStorage("token", token);    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    if (!email || !password) {
      setErrorMessage("Please fill all the fields");
      return;
    }
  //  if (password.length < 6) {
  //     setErrorMessage("Password should be greater than 6 character");
  //     return; 
  //   }
    const response = await loginUser(body);
    if (response.message === "User logged in") {
      setStorage('user', response)
      login(response.token);
      console.log('hello world: ', response.role);
      if(response.role==="student"){
        navigate("/dashboard/countries");
      }else if(response.role==="ugc-admin"){
        navigate("/dashboard/ugc");
      }else if(response.role==="hei-admin"){
        navigate("/dashboard/hei");
      }else if(response.role==="fundingAgency"){
        navigate("/dashboard/fa");
      }else{
        navigate("/dashboard/countries"); 
      }
    }
  };

  if (!isLoggedIn) {
    
          return (
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <Card variant="outlined" sx={{ p: 3 }}>
                    <Avatar sx={{ bgcolor: "secondary.main", margin: "auto", marginBottom: "5px" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4" fontWeight={700} textAlign="center">
                      Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} color="primary" />
                        }
                        label="Show password"
                      />
                      {errorMessage.length > 0 && <p style={{ color: "red" }}>{errorMessage}</p>}
                      <Button type="submit" onClick={() => navigate("/dashboard/countries")} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Login
                      </Button>
                      <Grid container>
                        <Grid item xs></Grid>
                        <Grid item>
                          <Link underline="none" onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
                            Don't have an account? Register here
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </Box>
              </Container>
            </ThemeProvider>
          );
      }  else {
        navigate("/dashboard/countries");

        return null; 
      }
        }
        