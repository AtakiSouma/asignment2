import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression"; // làm giảm kích thước nén dữ liệu
import dotenv from "dotenv";
import { connectDB } from "../src/config/connectDB";
import { errorHandler } from "./libs/handlers/errorsHandlers";
import path from "path";
import { route } from "./routes";
import {routeRender} from "./views/routes/routes"
dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Sử dụng middleware compression để nén dữ liệu trước khi gửi về client
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

app.set("view engine", "ejs");
connectDB();
route(app);
routeRender(app);
app.use(errorHandler);

export default app;
