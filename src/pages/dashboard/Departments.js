import { useState, useEffect } from "react";
import { getUsersForRole } from "../../api/services/users";
import { addDepartment, deleteDepartment, getAllDepartments, updateDepartment } from "../../api/services/departments";
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Organisations() {
  const [admins, setAdmins] = useState(undefined);
  const [employees, setEmployees] = useState(undefined);
  const [departments, setDepartments] = useState(undefined);
  const [departmentName, setDepartmentName] = useState("");
  const [adminId, setAdminId] = useState("");
  const [employeeIds, setEmployeeIds] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllAdmins = async () => {
    const response = await getUsersForRole({ role: "dept-admin" });
    if (response.status === "success") {
      setAdmins(response.data.map((admin) => ({ label: `${admin.firstName} ${admin.lastName}`, _id: admin?._id })));
    }
  };

  const fetchAllEmployees = async () => {
    const response = await getUsersForRole({ role: "university-admin" });
    if (response.status === "success") {
      setEmployees(response.data);
    }
  };

  const fetchAllDepartments = async () => {
    const response = await getAllDepartments();
    if (response.status === "success") {
      setDepartments(response.data);
    }
  };

  const closeDialog = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setDepartmentName("");
    setSelectedDepartmentId("");
    setAdminId("");
    setEmployeeIds([]);
  };

  const handleSuccessResponse = () => {
    fetchAllDepartments();
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedDepartmentId("");
    setAdminId("");
    setEmployeeIds([]);
  };

  const handleAdd = async () => {
    const response = await addDepartment({
      name: departmentName,
      admin: adminId,
      employees: employeeIds,
    });
    if (response.status === "success") {
      handleSuccessResponse();
    }
  };

  const handleUpdate = async () => {
    const response = await updateDepartment(selectedDepartmentId, {
      name: departmentName,
      admin: adminId,
      employees: employeeIds,
    });
    if (response.status === "success") {
      handleSuccessResponse();
    }
  };

  const handleDelete = async () => {
    const response = await deleteDepartment(selectedDepartmentId);
    if (response.status === "success") {
      handleSuccessResponse();
    }
  };

  useEffect(() => {
    fetchAllAdmins();
    fetchAllEmployees();
    fetchAllDepartments();
  }, []);

  return (
    <>
      <Grid container spacing={1} justifyContent="space-between" alignItems="center">
        <Grid item>
          <h2>Departments</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add Department
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
              <TableCell align="left">Employees</TableCell>
              <TableCell align="left" style={{ paddingLeft: 25 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments &&
              departments.map((row, index) => (
                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, padding: 8 }}>
                  <TableCell component="th" scope="row">
                    {index + 1}.
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">
                    {row.admin?.firstName} {row.admin?.lastName}
                  </TableCell>
                  <TableCell align="left">
                    {row?.employees?.map((emp) => `${emp.firstName} ${emp.lastName}`).join(", ")}
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      onClick={() => {
                        setShowEditModal(true);
                        setDepartmentName(row.name);
                        setSelectedDepartmentId(row._id);
                        setAdminId(row.admin?._id);
                        setEmployeeIds(row.employees?.map((e) => e._id));
                      }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setDepartmentName(row.name);
                        setSelectedDepartmentId(row._id);
                      }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={showAddModal} onClose={closeDialog} fullWidth={true} maxWidth="xs">
        <DialogTitle style={{ paddingBottom: 0 }}>Add Department</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="Name"
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <Autocomplete
            id="combo-box-demo"
            options={admins ? admins : []}
            sx={{ mt: 3 }}
            size="small"
            renderInput={(params) => <TextField {...params} label="Admin" />}
            fullWidth
            onChange={(e, v) => setAdminId(v._id)}
          />
          <FormControl sx={{ mt: 3, width: "100%" }}>
            <InputLabel id="demo-multiple-checkbox-label" size="small">
              Employees
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              label="Employees"
              size="small"
              sx={{ width: "100%" }}
              value={employeeIds}
              onChange={({ target: { value } }) => setEmployeeIds(typeof value === "string" ? value.split(",") : value)}
              input={<OutlinedInput label="Employees" />}
              renderValue={(selected) =>
                employees
                  ?.filter((emp) => selected.includes(emp._id))
                  .map((emp) => `${emp.firstName} ${emp.lastName}`)
                  .join(", ")
              }>
              {employees &&
                employees.map((emp) => (
                  <MenuItem key={emp._id} value={emp._id}>
                    <Checkbox checked={employeeIds.includes(emp._id)} />
                    <ListItemText primary={`${emp.firstName} ${emp.lastName}`} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleAdd} disabled={!departmentName || !adminId || employeeIds.length === 0}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showEditModal} onClose={closeDialog} fullWidth={true} maxWidth="xs">
        <DialogTitle style={{ paddingBottom: 0 }}>Edit Department</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="Name"
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <Autocomplete
            id="combo-box-demo"
            options={admins ? admins : []}
            sx={{ mt: 3 }}
            size="small"
            renderInput={(params) => <TextField {...params} label="Admin" />}
            fullWidth
            value={admins?.filter((a) => a._id === adminId)[0] || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, v) => setAdminId(v._id)}
          />
          <FormControl sx={{ mt: 3, width: "100%" }}>
            <InputLabel id="demo-multiple-checkbox-label" size="small">
              Employees
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              label="Employees"
              size="small"
              sx={{ width: "100%" }}
              value={employeeIds}
              onChange={({ target: { value } }) => setEmployeeIds(typeof value === "string" ? value.split(",") : value)}
              input={<OutlinedInput label="Employees" />}
              renderValue={(selected) =>
                employees
                  ?.filter((emp) => selected.includes(emp._id))
                  .map((emp) => `${emp.firstName} ${emp.lastName}`)
                  .join(", ")
              }>
              {employees &&
                employees.map((emp) => (
                  <MenuItem key={emp._id} value={emp._id}>
                    <Checkbox checked={employeeIds.includes(emp._id)} />
                    <ListItemText primary={`${emp.firstName} ${emp.lastName}`} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleUpdate} disabled={!departmentName || !adminId || employeeIds.length === 0}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      <ConfirmationModal
        open={showDeleteModal}
        message="Are you sure you want to delete this Department?"
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
    </>
  );
}
