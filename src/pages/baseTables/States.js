import { useState, useEffect } from "react";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { getAllCountries } from "../../api/services/baseTables/countries";
import { addState, deleteState, getAllStates, updateState } from "../../api/services/baseTables/states";
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
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function States() {
  const [states, setStates] = useState(undefined);
  const [state, setState] = useState("");
  const [countries, setCountries] = useState(undefined);
  const [countryId, setCountryId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllStates = async () => {
    const response = await getAllStates();
    if (response.status === "success") {
      setStates(response.data);
    }
  };

  const fetchAllCountries = async () => {
    const response = await getAllCountries();
    if (response.status === "success") {
      setCountries(response.data.map((country) => ({ label: country.name, _id: country._id })));
    }
  };

  const handleAdd = async () => {
    const response = await addState({ name: state, country: countryId });
    if (response.status === "success") {
      setState("");
      setCountryId("");
      setShowAddModal(false);
      fetchAllStates();
    }
  };

  const handleUpdate = async () => {
    const response = await updateState(selectedStateId, { name: state, country: countryId });
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

  useEffect(() => {
    fetchAllStates();
    fetchAllCountries();
  }, []);

  return (
    <>
      <Grid container spacing={1} justifyContent="space-between" alignItems="center">
        <Grid item>
          <h2>States</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add State
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} style={{ marginTop: 30 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Country</TableCell>
              <TableCell align="left" style={{ paddingLeft: 25 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {states &&
              states.map((row, index) => (
                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, padding: 8 }}>
                  <TableCell component="th" scope="row">
                    {index + 1}.
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.country?.name}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      onClick={() => {
                        setShowEditModal(true);
                        setState(row.name);
                        setSelectedStateId(row._id);
                        setCountryId(row.country?._id);
                      }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setState(row.name);
                        setSelectedStateId(row.country_id);
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
        maxWidth="xs">
        <DialogTitle style={{ paddingBottom: 0 }}>Add State</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <Autocomplete
            id="combo-box-demo"
            options={countries ? countries : []}
            sx={{ mt: 3 }}
            size="small"
            renderInput={(params) => <TextField {...params} label="Country" />}
            fullWidth
            onChange={(e, v) => setCountryId(v._id)}
          />
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
          <Button onClick={handleAdd} disabled={!state || !countryId}>
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
          <TextField
            autoFocus
            label="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <Autocomplete
            id="combo-box-demo"
            options={countries ? countries : []}
            sx={{ mt: 3 }}
            size="small"
            renderInput={(params) => <TextField {...params} label="Country" />}
            fullWidth
            value={countries?.filter((c) => c._id === countryId)[0] || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, v) => setCountryId(v._id)}
          />
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
          <Button onClick={handleUpdate} disabled={!state || !countryId}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message="Are you sure you want to delete this state?"
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
    </>
  );
}
