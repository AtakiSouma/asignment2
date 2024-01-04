import express from "express";
import axios from "axios";
export function routeRender(app: express.Express) {
  
  app.get("/", (req, res) => {
    res.render("index.ejs");
  });
  app.get("/movie" , async (req,res) => {
    const apiResponse = await axios.get('http://localhost:8080/api/movie');
    const movies = apiResponse.data.data;
      res.render('movies.ejs' , {listMovies: movies});
  })
}
