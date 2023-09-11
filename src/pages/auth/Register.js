import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { registerUser } from "../../api/services/auth";

const theme = createTheme();

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      firstName,
      lastName,
      email,
      password,
      gender,
      role,
    };

    const response = await registerUser(body)
    console.log(response);

    if (response) {
      navigate("/login");
    }
  };

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
              Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Gender *</InputLabel>
                    <Select
                      label="Gender *"
                      fullWidth
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Role *</InputLabel>
                    <Select
                      label="Role *"
                      fullWidth
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required>
                      <MenuItem value="student">Student</MenuItem>
                      <MenuItem value="hei-admin">HEI-Admin</MenuItem>
                      <MenuItem value="funding-agency">Funding Agency</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
               
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date of Birth *"
                      value={dob}
                      onChange={(value) => setDob(value)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Button type="submit"  onClick={() => navigate("/dashboard/countries")}  fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link underline="none" onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
                    Already have an account? Login here
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
