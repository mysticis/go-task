import axios from "axios";
const baseUrl = "http://localhost:8080";

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/task`);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log("error:", error);
    });
};

const create = async (newTask: any) => {
  console.log(newTask);
  const response = await axios.post(`${baseUrl}/api/task`, newTask, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  console.log(response.data);
  return response.data;
};

let servers = { getAll, create };

export default servers;
