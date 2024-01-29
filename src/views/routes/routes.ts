import express from "express";
import axios from "axios";
import { Request, Response } from "express";
import { data } from "autoprefixer";

export function routeRender(app: express.Express) {
  app.get("/modal", async (req, res) => {
    res.render("modal.ejs");
  });
  app.get("/", async (req, res) => {
    const response = await axios.post(
      "http://localhost:8080/api/orchids/getAll",
      {
        limit: 20,
        page: 1,
      }
    );
    const data_orchid = response.data.data.data;
    res.render("orchid", { orchid: data_orchid });
  });
  app.get("/dashboard", async (req, res) => {
    const response = await axios.post(
      "http://localhost:8080/api/orchids/getAll",
      {
        limit: 10,
        page: 1,
      }
    );
    const data = response.data.data.data;
    const data_page = response.data.data;
    res.render("dashboard.ejs", { orchid: data, pagination: data_page });
  });
  app.get("/addNew", async (req, res) => {
    // get all categories
    const response_category = await axios.get(
      "http://localhost:8080/api/categories/"
    );
    const data_category = response_category.data.data.data;
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
