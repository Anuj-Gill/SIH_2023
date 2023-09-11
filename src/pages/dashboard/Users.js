import { useState, useEffect } from "react";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { getAllUsers } from "../../api/services/users";
import { getAllRoles } from "../../api/services/baseTables/roles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getAllCountries } from "../../api/services/baseTables/countries";
import { addState } from "../../api/services/baseTables/states";
import { getAllStates } from "../../api/services/baseTables/states";
import { updateState } from "../../api/services/baseTables/states";
import { deleteState } from "../../api/services/baseTables/states";


export default function Users() {
  const [users, setUsers] = useState(undefined);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState();
  const [roles, setRoles] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [countries, setCountries] = useState("");
  const [state, setState] = useState("");
  const [countryId, setCountryId] = useState("");
  const [states, setStates] = useState([]);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const fetchAllUsers = async () => {
    const response = await getAllUsers();
    if (response.status === "success") {
      setUsers(response.data);
    }
  };

  const fetchAllRoles = async () => {
    const response = await getAllRoles();
    if (response.status === "success") {
      setRoles(response.data);
    }
  };

 console.log(users);
 
    const fetchAllCountries = async () => {
     const response = await getAllCountries();
     if (response.status === "success") {
        setCountries(response.data);
       }
     };

     const fetchAllStates = async () => {
        const response = await getAllStates(); 
        if (response.status === "success") {
          setStates(response.data); 
      } 
    };
    


  const handleAdd = async () => {
    const response = await addState({ name: state, country_id: countryId });
    if (response.status === "success") {
      setState("");
      setCountryId("");
      setShowAddModal(false);
      fetchAllStates();
    }
  };

  const handleUpdate = async () => {
    const response = await updateState(selectedStateId, { name: state, country_id: countryId });
    if (response.status === "success") {
      setState("");
      setCountryId("");
      setSelectedStateId("");
      setShowEditModal(false);
      fetchAllStates();
    }
  };

  const handleDelete = async () => {
    const response = await deleteState(selectedStateId);
    if (response.status === "success") {
      setState("");
      setCountryId("");
      setSelectedStateId("");
      setShowDeleteModal(false);
      fetchAllStates();
    }
  };

  console.log(users);

  useEffect(() => {
    fetchAllUsers();
    fetchAllRoles();
  }, []);

  return (
    <>
      <Grid container spacing={1} justifyContent="space-between" alignItems="center">
        <Grid item>
          <h2>Users</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add New User
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} style={{ marginTop: 30 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((row, index) => (
                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, padding: 8 }}>
                  <TableCell component="th" scope="row">
                    {index + 1}.
                  </TableCell>
                  <TableCell align="right">
                    {row.firstName} {row.lastName}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.mobile}</TableCell>
                  <TableCell align="right">{row.role?.name}</TableCell>
                  <TableCell align="right">
                    <IconButton
                    onClick={() => {
                      setShowEditModal(true);
                      setState(row.name);
                      setSelectedStateId(row._id);
                      setCountryId(row.country);
                    }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setSelectedStateId(row._id);
                      }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setState("");
          setCountryId("");
        }}
        fullWidth={true}
        maxWidth="sm">
        <DialogTitle style={{ paddingBottom: 0 }}>Add New User</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="First Name*"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="Last Name*"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="Email*"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="Phone Number*"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Role*</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Country"
                  onChange={(e) => setRole(e.target.value)}>
                  {roles &&
                    roles.map((role) => (
                      <MenuItem key={role._id} value={role._id}>
                        {role.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="Gender"
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="DOB*"
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddModal(false);
              setState("");
              setCountryId("");
            }}>
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
             disabled={!state || !countryId}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setState("");
          setCountryId("");
        }}
        fullWidth={true}
        maxWidth="xs">
        <DialogTitle style={{ paddingBottom: 0 }}>Edit State</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="First Name*"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="Last Name*"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="Email*"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="Phone Number*"
                type="text"
                value={setEmail}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Role*</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Country"
                  onChange={(e) => setRole(e.target.value)}>
                  {roles &&
                    roles.map((role) => (
                      <MenuItem key={role._id} value={role._id}>
                        {role.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="Gender"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="DOB*"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowEditModal(false);
              setState("");
              setCountryId("");
            }}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={!state || !countryId}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message="Are you sure you want to delete this user?"
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
    </>
  );
}
