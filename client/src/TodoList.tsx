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

  // Post task with
  const addTask = (taskObject: any) => {
    services.create(taskObject).then((returnedTask) => {
      setTask(task.concat(returnedTask));
    });
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
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Undo">
                    <IconButton edge="end" aria-label="undo">
                      <UndoIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Done">
                    <IconButton edge="end" aria-label="check">
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
              <ListItemText primary={task.task} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default TodoList;
