import axios from "axios";
const baseUrl = "http://localhost:8080";

//get all records from database
const getAll = () => {
  const request = axios.get(`${baseUrl}/api/task`);
  return request
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("error:", error);
    });
};

//Create a new record in the database
const create = async (newTask: any) => {
  console.log(newTask);
  const response = await axios.post(`${baseUrl}/api/task`, newTask, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

//delete a record from the database

const deleteTask = (id: any) => {
  const request = axios.delete(`${baseUrl}/api/deleteTask/${id}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return request
    .then((res) => res.data)
    .catch((error) => console.log("error:", error));
};

//update task
const updateTask = (id: string, taskToUpdate: any) => {
  console.log(taskToUpdate);
  const request = axios.put(`${baseUrl}/api/task/${id}`, taskToUpdate, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return request
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log("error:", error));
};

//undo task to database

const undoTask = (id: any, updatedTask: any) => {
  const request = axios.put(`${baseUrl}/api/undoTask/${id}`, updatedTask, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return request
    .then((response) => response.data)
    .catch((error) => console.log("error: " + error));
};

let servers = { getAll, create, deleteTask, updateTask, undoTask };

export default servers;
