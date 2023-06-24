import axios from "axios";

export const api = axios.create({
  // baseURL: "http://spacetime-database-api.azurewebsites.net/api",
  baseURL: "http://linux-api-server.brazilsouth.cloudapp.azure.com",
});
