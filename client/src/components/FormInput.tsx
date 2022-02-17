import { Box, TextField } from "@mui/material";
import { useState } from "react";

const TextFieldInput = ({ createTask }: { createTask: any }) => {
  const [newTask, setNewTask] = useState("");
  const [status, setStatus] = useState(false);

  //onchange handler
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
    console.log(event.target.value);
  };

  //add new setTask
  const addTask = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    createTask({
      task: newTask,
      status: status,
    });

    setNewTask("");
  };
  return (
    <>
      <Box
        sx={{
          maxWidth: "100%",
          marginTop: 10,
          width: "50%",
          marginBottom: 7,
        }}
      >
        <form onSubmit={addTask}>
          <TextField
            fullWidth
            placeholder="Enter tasks..."
            value={newTask}
            onChange={handleChange}
            autoFocus
          />
        </form>
      </Box>
    </>
  );
};

export default TextFieldInput;
