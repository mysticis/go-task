import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UndoIcon from "@mui/icons-material/Undo";
import { Box } from "@mui/system";
import services from "./services/taskServies";
import FormInput from "./components/FormInput";

//interface
interface TaskList {
  _id: string;
  task: string;
  status: boolean;
}

const defaultTasks: TaskList[] = [];

const TodoList = () => {
  const [task, setTask]: [TaskList[], (task: TaskList[]) => void] =
    useState(defaultTasks);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] =
    React.useState("");
  const [value, setValue] = useState("");

  //Get tasks with go backend

  useEffect(() => {
    services.getAll().then((tasks) => setTask(tasks));
    setLoading(false);
    console.log(task);
  }, []);

  // create task in database
  const addTask = (taskObject: any) => {
    services.create(taskObject).then((returnedTask) => {
      setTask(task.concat(returnedTask));
    });
  };

  //delete task from database

  const deleteTask = (id: string) => {
    const taskToDelete = task.find((task) => task._id === id);
    services.deleteTask(taskToDelete?._id);
    setTask(task.filter((task) => task._id !== id));
  };

  //update task

  const updateTask = (id: any) => {
    const taskToBeChanged = task.find((task) => task._id === id);
    const changedTask = {
      ...taskToBeChanged,
      status: !taskToBeChanged?.status,
    };
    services
      .updateTask(id, changedTask)
      .then((res) =>
        setTask(
          task.map((task) =>
            task._id === res ? { ...task, status: !task.status } : task
          )
        )
      );
  };

  //undo task
  const undoTasks = (id: any) => {
    const taskToBeChanged = task.find((task) => task._id === id);
    const changedTask = {
      ...taskToBeChanged,
      status: !taskToBeChanged?.status,
    };
    services
      .undoTask(id, changedTask)
      .then((res) =>
        setTask(
          task.map((task) =>
            task._id === res ? { ...task, status: !task.status } : task
          )
        )
      );
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" style={{ fontFamily: "Quicksand" }}>
        Tasklist App
      </Typography>
      <FormInput createTask={addTask} />
      <List sx={{ width: "100%", maxWidth: 500 }}>
        {task?.map((task, i) => {
          return (
            <ListItem
              secondaryAction={
                <Box
                  sx={{
                    "& > :not(style)": {
                      m: 0.5,
                    },
                  }}
                >
                  <Tooltip title="Delete">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteTask(task._id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Undo">
                    <IconButton
                      edge="end"
                      aria-label="undo"
                      onClick={() => undoTasks(task._id)}
                    >
                      <UndoIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Done">
                    <IconButton
                      edge="end"
                      aria-label="check"
                      onClick={() => updateTask(task._id)}
                    >
                      <CheckCircleIcon color="success" />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
              key={i}
              style={{
                marginBottom: 5,
                border: "2px solid green",
                borderRadius: 10,
              }}
            >
              <ListItemText
                primary={task.task}
                sx={{ textDecoration: task.status ? "line-through" : "none" }}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default TodoList;
