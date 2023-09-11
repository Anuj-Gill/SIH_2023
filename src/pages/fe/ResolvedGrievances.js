import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/common-utils";
import { sortByCreatedAtDate, sortByDeadlineDate } from "../../utils/grievances-utils";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Chip from "@mui/material/Chip";

export default function ResolvedGrievances() {
  const [grievances, setGrievances] = useState(data);
  const [createdAtOrder, setCreatedAtOrder] = useState("asc");
  const [deadlineOrder, setDeadlineOrder] = useState("asc");
  const navigate = useNavigate();

  const handleCreatedAtSort = () => {
    setGrievances(sortByCreatedAtDate(grievances, createdAtOrder));
    setCreatedAtOrder(createdAtOrder === "asc" ? "desc" : "asc");
  };

  const handleDeadlineSort = () => {
    setGrievances(sortByDeadlineDate(grievances, deadlineOrder));
    setDeadlineOrder(deadlineOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <Grid container spacing={1} justifyContent="space-between" alignItems="center">
        <Grid item>
          <h2>Resolved Grievances</h2>
        </Grid>
      </Grid>
      <TableContainer component={Paper} style={{ marginTop: 30 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">
                <TableSortLabel active={true} direction={createdAtOrder} onClick={handleCreatedAtSort}>
                  Created At
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel active={true} direction={deadlineOrder} onClick={handleDeadlineSort}>
                  Deadline
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => (
                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, padding: 8 }}>
                  <TableCell component="th" scope="row">
                    {index + 1}.
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.department}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={row.status}
                      sx={{ backgroundColor: "#43a047", color: "#fff", width: 70 }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">{formatDate(row.createdAt)}</TableCell>
                  <TableCell align="right">{formatDate(row.deadline)}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => navigate(`/dashboard/grievances/show/${row._id}`)}>View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Container sx={{ display: "grid", placeItems: "center", pt: 4 }}>
        <Pagination count={10} color="primary" />
      </Container>
    </>
  );
}

const data = [
  {
    _id: 1,
    title: "title 1",
    description: "description",
    deadline: new Date(2022, 11, 24, 10, 33, 30),
    department: "Department 1",
    type: "type 1",
    category: "category",
    status: "Resolved",
    createdAt: new Date(2022, 6, 24, 10, 33, 30),
  },
  {
    _id: 2,
    title: "title 2",
    description: "description",
    deadline: new Date(2022, 10, 25, 10, 33, 30),
    department: "Department 3",
    type: "type 1",
    category: "category",
    status: "Resolved",
    createdAt: new Date(2022, 6, 22, 10, 33, 30),
  },
  {
    _id: 3,
    title: "title 3",
    description: "description",
    deadline: new Date(2022, 11, 24, 10, 33, 30),
    department: "Department 2",
    type: "type 1",
    category: "category",
    status: "Resolved",
    createdAt: new Date(2022, 6, 24, 10, 33, 30),
  },
  {
    _id: 4,
    title: "title 4",
    description: "description",
    deadline: new Date(2022, 11, 24, 10, 33, 30),
    department: "Department 1",
    type: "type 1",
    category: "category",
    status: "Resolved",
    createdAt: new Date(2022, 6, 24, 10, 33, 30),
  },
];
