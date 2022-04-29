import dotenv from "dotenv/config";
import "regenerator-runtime";
import "./db";

import Student from "./model/Student";
import Assignment from "./model/Assignment";

import app from "./server";

const handleListening = () => {
  console.log(`✅ Server listening on port ${PORT} 🚀`);
};

app.listen(process.env.PORT || 4000, handleListening);
