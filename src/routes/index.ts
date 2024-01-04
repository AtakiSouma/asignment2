import express from 'express';
import userRouter from "./api/userApi"; 
import categoryRouter from "./api/categoryApi"; 
import movieRouter from "./api/movieApi";  
import authRouter from "./api/authApi";
export function route(app: express.Express){
    app.use("/api/user" ,userRouter );
    app.use("/api/category" ,categoryRouter);
    app.use("/api/movie" ,movieRouter);
    app.use("/api/auth" ,authRouter);
}