import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./Middlewares/errorMiddleware";


import userRoute from "./Routes/userRoute";
import contentRoute from "./Routes/contentRoute";
import categoryRoute from "./Routes/categoryRoutes";
import resetPasswordRoute  from "./Routes/resetPasswordRoute";

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

// api routing 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", contentRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/setting", resetPasswordRoute );




//for ErrorHandling
app.use(errorHandler);
app.use(notFound);

export default app