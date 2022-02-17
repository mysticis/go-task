import { useState, useEffect } from "react";
import axios from "axios";

const endpoint = "http://localhost:8080";

const Test = () => {
  const [task, setTask] = useState([]);
  const [value, setValue] = useState("");

  //post function to
  useEffect(() => {
    axios
      .get(`${endpoint}/api/task`)
      .then((response) => {
        console.log(response.data);
        setTask(task.concat(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //add task function
  const addTask = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    axios.post(`${endpoint}/api/task`, { task: task }).then((response) => {
      console.log(response.data);
      setTask(task.concat(response.data));
      console.log("returned...", value);
      setValue("");
    });
  };

  //onchange handler
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <form onSubmit={addTask}>
        <input
          value={value}
          onChange={handleChange}
          placeholder="enter task"
        ></input>
      </form>
      <div>
        <ul>
          {task.map((task, i) => (
            <li key={i}>{task}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Test;
