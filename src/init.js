import "regenerator-runtime";
import dotenv from "dotenv/config";
import "./db";

import Student from "./model/Student";
import Assignment from "./model/Assignment";

import app from "./server";

const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`✅ Server listening on port ${PORT} 🚀`);
};

app.listen(PORT, handleListening);
