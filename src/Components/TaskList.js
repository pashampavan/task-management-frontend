import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import context from "../Context/useContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem as SelectMenuItem,
  Switch,
} from "@mui/material";
import axios from "axios";

const TaskList = () => {
  const { login } = useContext(context);
  const navigate = useNavigate();

  // State variables
  const [tasks, setTasks] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: 1,
    status: false,
    start: "",
    end: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      fetchTasks();
    }
  }, [login]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://task-managementtask6.vercel.app/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if(response.data.length !== 0) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Handle Add/Edit Task Dialog open/close
  const handleDialogOpen = (task = null) => {
    if (task) {
      setEditMode(true);
      setCurrentTaskId(task._id);
      setNewTask({
        title: task.title,
        priority: task.priority,
        status: task.status === "Finished",
        start: task.start_time,
        end: task.end_time,
      });
    } else {
      setEditMode(false);
      setNewTask({
        title: "",
        priority: 1,
        status: false,
        start: "",
        end: "",
      });
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewTask({
      title: "",
      priority: 1,
      status: false,
      start: "",
      end: "",
    });
    setEditMode(false);
  };

  // Handle Add/Edit Task
  const handleSaveTask = async () => {
    try {
      if (newTask.start > newTask.end) {
        throw new Error("Start time should not be greater than end time!");
      }
      if (editMode) {
        // Edit Task
        await axios.put(
          `https://task-managementtask6.vercel.app/tasks/${currentTaskId}`,
          {
            ...newTask,
            status: newTask.status ? "Finished" : "Pending",
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
      } else {
        // Add Task
        await axios.post(
          "https://task-managementtask6.vercel.app/tasks",
          {
            ...newTask,
            status: newTask.status ? "Finished" : "Pending",
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
      }
      fetchTasks();
      handleDialogClose();
    } catch (error) {
      alert("Error saving task: " + error.message);
      console.error("Error saving task:", error);
    }
  };

  // Handle Delete Task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://task-managementtask6.vercel.app/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const handleSortByTime = () => {
    if (!tasks) return;
    const sortedByStartTime = tasks.slice().sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
    setTasks(sortedByStartTime);
  };

  const handleSortByEndTime = () => {
    if (!tasks) return;
    const sortedByEndTime = tasks.slice().sort((a, b) => new Date(a.end_time) - new Date(b.end_time));
    setTasks(sortedByEndTime);
  };

  const handleSortByPriority = () => {
    if (!tasks) return;
    const sortedByPriority = tasks.slice().sort((a, b) => b.priority - a.priority);
    setTasks(sortedByPriority);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Task List</Typography>
        <Stack direction="row" spacing={1}>
        <Button
  variant="contained"
  color="primary"
  size="small"
  sx={{
    fontSize: { xs: '0.8rem', sm: '1rem' }, // Adjust the font size based on screen size
  }}
  onClick={() => handleSortByPriority()}
>
  Sort By Priority
</Button>

<Button
  variant="contained"
  color="secondary"
  size="small"
  sx={{
    fontSize: { xs: '0.8rem', sm: '1rem' },
  }}
  onClick={() => handleSortByTime()}
>
  Sort By Start Time
</Button>

<Button
  variant="contained"
  color="warning"
  size="small"
  sx={{
    fontSize: { xs: '0.8rem', sm: '1rem' },
  }}
  onClick={() => handleSortByEndTime()}
>
  Sort By End Time
</Button>

<Button
  variant="contained"
  color="success"
  size="small"
  sx={{
    fontSize: { xs: '0.8rem', sm: '1rem' },
  }}
  onClick={() => handleDialogOpen()}
>
  + Add Task
</Button>

        </Stack>
      </Stack>

      <Grid container spacing={2}>
        {tasks ? (
          tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card sx={{ border: "1px solid #ccc" }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {task.title}
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
                    Start: {formatDate(task.start_time)}
                  </Typography>
                  <Typography variant="body2">
                    End: {formatDate(task.end_time)}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
                    <Button size="small" variant="outlined" onClick={() => handleDialogOpen(task)}>
                      Edit
                    </Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => handleDeleteTask(task._id)}>
                      Delete
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Typography variant="h6">Please add tasks!</Typography>
          </Box>
        )}
      </Grid>

      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Title"
              fullWidth
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                {[1, 2, 3, 4, 5].map((priority) => (
                  <SelectMenuItem value={priority} key={priority}>
                    {priority}
                  </SelectMenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography>Status</Typography>
              <Switch
                checked={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.checked })}
              />
            </Stack>
            <TextField
              label="Start Time"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={
                newTask.start
                  ? new Date(new Date(newTask.start).getTime() - new Date().getTimezoneOffset() * 60000)
                      .toISOString()
                      .slice(0, 16)
                  : ''
              }
              onChange={(e) => setNewTask({ ...newTask, start: e.target.value })}
            />
            <TextField
              label="End Time"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={
                newTask.end
                  ? new Date(new Date(newTask.end).getTime() - new Date().getTimezoneOffset() * 60000)
                      .toISOString()
                      .slice(0, 16)
                  : ''
              }
              onChange={(e) => setNewTask({ ...newTask, end: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveTask}>
            {editMode ? "Update Task" : "Add Task"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;
