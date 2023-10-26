import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./Middlewares/errorMiddleware";


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/test", (_req, res) => {
  res.send("Hi Content Management")
})


// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
}



//for ErrorHandling
app.use(errorHandler);
app.use(notFound);

export default app