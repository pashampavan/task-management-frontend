import React from "react";
import { Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const Dashboard = () => {
  const summaryData = [
    { label: "Total tasks", value: "25" },
    { label: "Tasks completed", value: "40%" },
    { label: "Tasks pending", value: "60%" },
    { label: "Average time per completed task", value: "3.5 hrs" },
  ];

  const pendingSummaryData = [
    { label: "Pending tasks", value: "15" },
    { label: "Total time lapsed", value: "56 hrs" },
    { label: "Total time to finish", value: "24 hrs (estimated based on end time)" },
  ];

  const taskPriorityData = [
    { priority: 1, pending: 3, lapsed: 12, finish: 8 },
    { priority: 2, pending: 5, lapsed: 6, finish: 3 },
    { priority: 3, pending: 1, lapsed: 8, finish: 7 },
    { priority: 4, pending: 0, lapsed: 0, finish: 0 },
    { priority: 5, pending: 6, lapsed: 30, finish: 6 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Summary Section */}
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Summary
        </Typography>
        <Grid container spacing={2}>
          {summaryData.map((item, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box sx={{ textAlign: "center", p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
                <Typography variant="h5" color="primary">
                  {item.value}
                </Typography>
                <Typography variant="body2">{item.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pending Task Summary Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Pending Task Summary
        </Typography>
        <Grid container spacing={2}>
          {pendingSummaryData.map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box sx={{ textAlign: "center", p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
                <Typography variant="h5" color="primary">
                  {item.value}
                </Typography>
                <Typography variant="body2">{item.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Task Priority Table */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Task Priority Summary
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Priority</TableCell>
                <TableCell>Pending Tasks</TableCell>
                <TableCell>Time Lapsed (hrs)</TableCell>
                <TableCell>Time to Finish (hrs)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskPriorityData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.priority}</TableCell>
                  <TableCell>{row.pending}</TableCell>
                  <TableCell>{row.lapsed}</TableCell>
                  <TableCell>{row.finish}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
