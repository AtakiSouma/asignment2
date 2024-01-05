import express from "express";
import axios from "axios";
import { Request, Response } from "express";

export function routeRender(app: express.Express) {
  app.get("/", (req, res) => {
    res.render("index.ejs");
  });
  app.get("/movie", async (req, res) => {
    const searchQuery = req.query.search;
    const apiResponse = await axios.get("http://localhost:8080/api/movie", {
      params: { search: searchQuery },
    });
    const movies = apiResponse.data.data;
    res.render("movies.ejs", { movies: movies });
  });

  // app.get("/movie/:slug",async (req:Request,res:Response) => {

  // })
  // Assuming you have already defined your express app and set up other necessary middleware
  app.get("/movie/:slug", async (req, res) => {
    const slugParam = req.params.slug;

    try {
      const apiResponse = await axios.post(
        "http://localhost:8080/api/movie/single-slug",
        {
          input: {
            slug: slugParam,
          },
        }
      );

      const movie = apiResponse.data.data;

      if (!movie) {
        // Handle case where the movie with the given slug is not found
        return res
          .status(404)
          .render("error.ejs", { message: "Movie not found" });
      }

      res.render("singleMovie.ejs", { movie: movie });
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error(error);
      res.status(500).render("error.ejs", { message: "Internal Server Error" });
    }
  });

  app.get("/movie/create", async (req, res) => {
    
  })

  app.get("/user", async (req: Request, res: Response) => {
    try {
      const apiResponse = await axios.get(
        "http://localhost:8080/api/user/list"
      );
      let users = apiResponse.data.data;

      // Remove empty strings from the array
      users = users.map((user: Record<string, string>) => {
        for (const key in user) {
          if (user[key] === "") {
            delete user[key];
          }
        }
        return user;
      });
      const numRows = users.length;

      res.render("user.ejs", { users: users, numRows: numRows });
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
}
