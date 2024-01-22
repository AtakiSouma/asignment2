import express from "express";
import axios from "axios";
import { Request, Response } from "express";
import { data } from "autoprefixer";

export function routeRender(app: express.Express) {
  app.get("/", (req, res) => {
    res.render("index.ejs");
  });

  app.get("/orchid", async (req, res) => {
    const response = await axios.get("http://localhost:8080/api/orchids/");

    const data_orchid = response.data.data;
    res.render("orchid", { orchid: data_orchid });
  });
  app.get("/dashboard", async (req, res) => {
    const response = await axios.get("http://localhost:8080/api/orchids/");
    const data = response.data.data;
    res.render("dashboard.ejs", { orchid: data });
  });
  app.get("/addNew", async (req, res) => {
    // get all categories
    const response_category = await axios.get(
      "http://localhost:8080/api/categories/"
    );
    const data_category = response_category.data.data;
    res.render("addNew.ejs", { categories: data_category });
  });

  app.get("/update/:slug", async (req, res) => {
    const slugParam = req.params.slug;
    try {
      const apiResponse = await axios.get(
        `http://localhost:8080/api/orchids/${slugParam}`
      );
      const orchid = apiResponse.data.data;
      if (!orchid) {
        // Handle case where the movie with the given slug is not found
        return res
          .status(404)
          .render("error.ejs", { message: "Orchid not found" });
      }
      res.render("update.ejs", { data: orchid });
    } catch (err) {}
  });
  app.get("/orchid/:slug", async (req, res) => {
    const slugParam = req.params.slug;
    try {
      const apiResponse = await axios.get(
        `http://localhost:8080/api/orchids/${slugParam}`
      );
      const orchid = apiResponse.data.data;
      if (!orchid) {
        // Handle case where the movie with the given slug is not found
        return res
          .status(404)
          .render("error.ejs", { message: "Orchid not found" });
      }
      res.render("singleOrchid.ejs", { data: orchid });
    } catch (err) {}
  });
}
