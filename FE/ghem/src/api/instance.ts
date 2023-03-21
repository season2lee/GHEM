import axios from "axios";

const instance = axios.create({
  baseURL: "", // endpoint
  headers: {}, // json or multipart
});

export { instance };
