import { useState, useEffect } from "react";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { getAllStates } from "../../api/services/baseTables/states";
import { getAllDistricts, addDistrict, updateDistrict, deleteDistrict } from "../../api/services/baseTables/districts";
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

export default function Districts() {
  const [districts, setDistricts] = useState(undefined);
  const [district, setDistrict] = useState("");
  const [states, setStates] = useState(undefined);
  const [stateId, setStateId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllDistricts = async () => {
    const response = await getAllDistricts();
    if (response.status === "success") {
      setDistricts(response.data);
    }
  };

  const fetchAllStates = async () => {
    const response = await getAllStates();
    if (response.status === "success") {
      setStates(response.data.map((state) => ({ label: state.name, _id: state._id })));
    }
  };

  const handleAdd = async () => {
    const response = await addDistrict({ name: district, state: stateId });
    if (response.status === "success") {
      setDistrict("");
      setStateId("");
      setShowAddModal(false);
      fetchAllDistricts();
    }
  };

  const handleUpdate = async () => {
    const response = await updateDistrict(selectedDistrictId, { name: district, state: stateId });
    if (response.status === "success") {
      setDistrict("");
      setStateId("");
      setSelectedDistrictId("");
      setShowEditModal(false);
      fetchAllDistricts();
    }
  };

  const handleDelete = async () => {
    const response = await deleteDistrict(selectedDistrictId);
    if (response.status === "success") {
      setDistrict("");
      setStateId("");
      setSelectedDistrictId("");
      setShowDeleteModal(false);
      fetchAllDistricts();
    }
  };

  useEffect(() => {
    fetchAllDistricts();
    fetchAllStates();
  }, []);

  return (
    <>
      <Grid container spacing={1} justifyContent="space-between" alignItems="center">
        <Grid item>
          <h2>Districts</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add District
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} style={{ marginTop: 30 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">State</TableCell>
              <TableCell align="left" style={{ paddingLeft: 25 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {districts &&
              districts.map((row, index) => (
                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, padding: 8 }}>
                  <TableCell component="th" scope="row">
                    {index + 1}.
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.state?.name}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      onClick={() => {
                        setShowEditModal(true);
                        setDistrict(row.name);
                        setSelectedDistrictId(row._id);
                        setStateId(row.state?._id);
                      }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setDistrict(row.name);
                        setSelectedDistrictId(row._id);
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
          setDistrict("");
          setStateId("");
        }}
        fullWidth={true}
        maxWidth="xs">
        <DialogTitle style={{ paddingBottom: 0 }}>Add District</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="District"
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <Autocomplete
            id="combo-box-demo"
            options={states ? states : []}
            sx={{ mt: 3 }}
            size="small"
            renderInput={(params) => <TextField {...params} label="State" />}
            fullWidth
            onChange={(e, v) => setStateId(v._id)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddModal(false);
              setDistrict("");
              setStateId("");
            }}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={!district || !stateId}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setDistrict("");
          setStateId("");
        }}
        fullWidth={true}
        maxWidth="xs">
        <DialogTitle style={{ paddingBottom: 0 }}>Edit District</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="District"
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <Autocomplete
            id="combo-box-demo"
            options={states ? states : []}
            sx={{ mt: 3 }}
            size="small"
            renderInput={(params) => <TextField {...params} label="States" />}
            fullWidth
            value={states?.filter((s) => s._id === stateId)[0] || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, v) => setStateId(v._id)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowEditModal(false);
              setDistrict("");
              setStateId("");
            }}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={!district || !stateId}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message="Are you sure you want to delete this district?"
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
    </>
  );
}