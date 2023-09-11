import React from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/common-utils";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

export default function ResolvedGrievances() {
  const { id } = useParams();

  return (
    <>
      <Grid container spacing={1} justifyContent="space-between" alignItems="center">
        <Grid item>
          <h2>Grievance #{id}</h2>
        </Grid>
      </Grid>
      <Card sx={{ minWidth: 275, marginTop: "15px" }}>
        <CardContent sx={{ padding: "25px" }}>
          <Typography variant="h5" component="div" style={{ fontWeight: 600, fontSize: 24, marginBottom: 20 }}>
            Grievance Title
          </Typography>
          <GrievanceDetail
            title="Description"
            value="Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Perspiciatis fugiat rem debitis ipsa fugit hic minus"
          />
          <GrievanceDetail title="Status" value="Pending" />
          <GrievanceDetail title="Department" value="Department1" />
          <GrievanceDetail title="Type" value="Type" />
          <GrievanceDetail title="Category" value="category" />
          <GrievanceDetail title="Deadline" value={formatDate(new Date(2022, 11, 24, 10, 33, 30))} />
        </CardContent>
        <CardActions>
          <Timeline style={{ marginTop: 10, padding: "0 16px" }}>
            <TimelineItemComponent
              title="Created At"
              desc={formatDate(new Date(2022, 6, 24, 10, 33, 30))}
              isDotActive={true}
              isSeparatorActive={true}
            />
            <TimelineItemComponent
              title="Assigned At"
              desc={formatDate(new Date(2022, 6, 25, 11, 30, 30))}
              isDotActive={true}
            />
            <TimelineItemComponent title="Status" desc="Pending" isLastItem={true} />
          </Timeline>
        </CardActions>
      </Card>
    </>
  );
}

function GrievanceDetail({ title, value }) {
  return (
    <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
      <span style={{ color: "#000", fontWeight: 600 }}>{title}: </span> {value}
    </Typography>
  );
}

function TimelineItemComponent({ title, desc, isDotActive = false, isSeparatorActive = false, isLastItem = false }) {
  return (
    <TimelineItem>
      <TimelineOppositeContent color="text.secondary" style={{ flex: 0.01, padding: 0 }}></TimelineOppositeContent>
      <TimelineSeparator>
        {isDotActive ? <TimelineDot color="primary" /> : <TimelineDot />}
        {!isLastItem &&
          (isSeparatorActive ? <TimelineConnector sx={{ bgcolor: "primary.main" }} /> : <TimelineConnector />)}
      </TimelineSeparator>
      <TimelineContent>
        <span style={{ color: "#000", fontWeight: 600 }}>{title}: </span>
        {desc}
      </TimelineContent>
    </TimelineItem>
  );
}
