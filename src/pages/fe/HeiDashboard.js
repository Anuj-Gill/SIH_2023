import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function HeiDashboard() {
  return (
    <div style={{ marginTop: 60 }}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <BasicCard title="All" total={12} link="/dashboard/grievances/all" />
        </Grid>
        <Grid item xs={4}>
          <BasicCard title="Pending" total={7} link="/dashboard/grievances/pending" color="#BB2124" />
        </Grid>
        <Grid item xs={4}>
          <BasicCard title="Resolved" total={5} link="/dashboard/grievances/resolved" color="#22BB33" />
        </Grid>
        <Grid item xs={12}>
          <FileGrievanceCard />
        </Grid>
      </Grid>
    </div>
  );
}

function BasicCard({ title, total, link, color }) {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(link);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div" style={{ fontWeight: 600, fontSize: 50, color }}>
          {total}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          grievances
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis fugiat rem debitis ipsa fugit hic minus
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Button size="small" onClick={handleNavigate} variant="contained">
          View All
        </Button>
      </CardActions>
    </Card>
  );
}

function FileGrievanceCard() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/dashboard/hei/grievances/file");
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div" style={{ fontWeight: 600, fontSize: 24, marginBottom: 20 }}>
          File a Grievance
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis fugiat rem debitis ipsa fugit hic minus
          eaque nostrum, esse recusandae eius adipisci repudiandae vero, neque, ipsam nemo itaque aspernatur labore.
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Button size="small" onClick={handleNavigate} variant="contained">
          File a Grievance
        </Button>
      </CardActions>
    </Card>
  );
}
