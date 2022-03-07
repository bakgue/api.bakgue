import dotenv from "dotenv/config";
import "regenerator-runtime";
import "./db";

// TODO: Import Models

import app from "./server";

const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);
