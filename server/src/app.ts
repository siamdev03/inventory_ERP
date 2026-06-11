import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Inventory ERP API");
});

export default app;