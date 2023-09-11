import { useState, useEffect } from "react";
import {
  addUniversity,
  deleteUniversity,
  getAllUniversities,
  updateUniversity,
} from "../../api/services/baseTables/universities";
import { getUsersForRole } from "../../api/services/users";
import ConfirmationModal from "../../components/common/ConfirmationModal";
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

export default function Universities() {
  const [admins, setAdmins] = useState([]);
  const [universities, setUniversities] = useState(undefined);
  const [universityName, setUniversityName] = useState("");
  const [selectedUniversityId, setSelectedUniversityId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllUniversityAdmins = async () => {
    const response = await getUsersForRole({ role: "university-admin" });
    if (response.status === "success") {
      setAdmins(response.data.map((admin) => ({ label: `${admin.firstName} ${admin.lastName}`, _id: admin?._id })));
    }
  };

  const fetchAllUniversities = async () => {
    const response = await getAllUniversities();
    if (response.status === "success") {
      setUniversities(response.data);
    }
  };

  const handleAdd = async () => {
    const response = await addUniversity({ name: universityName, admin: adminId });
    if (response.status === "success") {
      setUniversityName("");
      setSelectedUniversityId("");
      setShowAddModal(false);
      fetchAllUniversities();
    }
  };

  const handleUpdate = async () => {
    const response = await updateUniversity(selectedUniversityId, { name: universityName, admin: adminId });
    if (response.status === "success") {
      setUniversityName("");
      setSelectedUniversityId("");
      setAdminId("");
      setShowEditModal(false);
      fetchAllUniversities();
    }
  };

  const handleDelete = async () => {
    const response = await deleteUniversity(selectedUniversityId);
    if (response.status === "success") {
      setUniversityName("");
      setSelectedUniversityId("");
      setAdminId("");
      setShowEditModal(false);
      fetchAllUniversities();
    }
  };

  useEffect(() => {
    fetchAllUniversities();
    fetchAllUniversityAdmins();
  }, []);

  return (
    <>
      <Grid container spacing={1} justifyContent="space-between" alignItems="center">
        <Grid item>
          <h2>Universities</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add University
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} style={{ marginTop: 30 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Admin</TableCell>
              <TableCell align="left" style={{ paddingLeft: 25 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {universities &&
              universities.map((row, index) => (
                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, padding: 8 }}>
                  <TableCell component="th" scope="row">
                    {index + 1}.
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">
                    {row.admin?.firstName} {row.admin?.lastName}
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      onClick={() => {
                        setShowEditModal(true);
                        setUniversityName(row.name);
                        setSelectedUniversityId(row?._id);
                        setAdminId(row.admin?._id);
                      }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setSelectedUniversityId(row?._id);
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
          setUniversityName("");
          setSelectedUniversityId("");
          setAdminId("");
        }}
        fullWidth={true}
        maxWidth="xs">
        <DialogTitle style={{ paddingBottom: 0 }}>Add University</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="Name"
            type="text"
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <Autocomplete
            id="combo-box-demo"
            options={admins ? admins : []}
            sx={{ mt: 3 }}
            size="small"
            renderInput={(params) => <TextField {...params} label="University Admin" />}
            fullWidth
            onChange={(e, v) => setAdminId(v._id)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddModal(false);
              setUniversityName("");
              setSelectedUniversityId("");
              setAdminId("");
            }}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={!universityName || !adminId}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setUniversityName("");
          setSelectedUniversityId("");
          setAdminId("");
        }}
        fullWidth={true}
        maxWidth="xs">
        <DialogTitle style={{ paddingBottom: 0 }}>Edit University</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="Name"
            type="text"
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <Autocomplete
            id="combo-box-demo"
            options={admins ? admins : []}
            sx={{ mt: 3 }}
            size="small"
            renderInput={(params) => <TextField {...params} label="University Admin" />}
            fullWidth
            value={admins?.filter((a) => a?._id === adminId)[0] || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, v) => setAdminId(v?._id)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowEditModal(false);
              setUniversityName("");
              setSelectedUniversityId("");
              setAdminId("");
            }}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message="Are you sure you want to delete this University?"
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
    </>
  );
}
