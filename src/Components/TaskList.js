import React,{useContext,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import context from '../Context/useContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem as SelectMenuItem,
  Switch,
  DialogActions,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

const TaskList = () => {
  const {login,setLogin}=useContext(context);
  const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("token"))
    {
      navigate('/');
    }
  },[login])
  const tasks = [
    {
      id: 1,
      title: "Buy clothes",
      status: "Pending",
      priority: 5,
      start: "26-Nov-24 11:00 AM",
      end: "30-Nov-24 11:00 AM",
    },
    {
      id: 2,
      title: "Finish code",
      status: "Finished",
      priority: 2,
      start: "25-Nov-24 09:05 AM",
      end: "25-Nov-24 03:15 PM",
    },
    {
      id: 3,
      title: "Book travel tickets",
      status: "Pending",
      priority: 4,
      start: "20-Nov-24 11:00 PM",
      end: "25-Nov-24 11:00 PM",
    },
    {
      id: 4,
      title: "Order groceries",
      status: "Finished",
      priority: 3,
      start: "14-Oct-24 10:30 AM",
      end: "16-Oct-24 10:30 PM",
    },
    {
      id: 5,
      title: "Medical checkup",
      status: "Pending",
      priority: 1,
      start: "19-Nov-24 01:15 PM",
      end: "21-Dec-24 05:00 PM",
    },
  ];

  // Sort Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openSort = Boolean(anchorEl);

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortClose = () => {
    setAnchorEl(null);
  };

  // Add Task Dialog
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">Task List</Typography>
        <Button variant="contained" color="primary" size="small" onClick={handleDialogOpen}>
          + Add Task
        </Button>
      </Stack>

      {/* Sort Options */}
      <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mb: 2 }}>
        <IconButton onClick={handleSortClick}>
          <SortIcon />
        </IconButton>
        <Typography sx={{ mr: 1 }}>Sort:</Typography>
        <Button size="small" sx={{ mr: 1 }}>
          Priority
        </Button>
        <Button size="small">Status</Button>
        <Menu anchorEl={anchorEl} open={openSort} onClose={handleSortClose}>
          <MenuItem onClick={handleSortClose}>Priority</MenuItem>
          <MenuItem onClick={handleSortClose}>Status</MenuItem>
        </Menu>
      </Stack>

      {/* Task Cards */}
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card sx={{ border: "1px solid #ccc" }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Task ID: {task.id} -{" "}
                  <Typography component="span" sx={{ color: "#1976d2", cursor: "pointer" }}>
                    {task.title}
                  </Typography>
                </Typography>
                <Chip
                  label={task.status}
                  color={task.status === "Finished" ? "success" : "warning"}
                  size="small"
                  sx={{ mt: 1, mb: 1 }}
                />
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Priority: {task.priority}
                </Typography>
                <Typography variant="body2">
                  Start: {task.start}
                  <br />
                  End: {task.end}
                </Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                  <Button size="small" variant="outlined" color="error">
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Task Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField label="Title" fullWidth />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select>
                {[1, 2, 3, 4, 5].map((priority) => (
                  <SelectMenuItem value={priority} key={priority}>
                    {priority}
                  </SelectMenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography>Status</Typography>
              <Switch />
            </Stack>
            <TextField
              label="Start Time"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="End Time"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogClose}>
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;
