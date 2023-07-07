import axios from "axios";

export const api = axios.create({
  // baseURL: "http://spacetime-database-api.azurewebsites.net/api",
  baseURL: "https://linux-api-server.brazilsouth.cloudapp.azure.com",
});
