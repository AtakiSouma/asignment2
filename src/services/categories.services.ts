import { Request, Response } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { generateError } from "../libs/handlers/errorsHandlers";
import { CategoryInput } from "../constants/data";
import { Categories } from "../models/Categories";
import { Movie } from "../models/Movies";
import GenerateSlug from "../util/GenerateSlug";

class categoriesServices {
  public async createNewCategory(input: CategoryInput) {
    const category = await Categories.findOne({ title: input.title });
    if (category) {
      throw generateError(
        `${input.title} is already exist`,
        HttpStatusCodes.BAD_REQUEST
      );
    }
    const new_category = await Categories.create({
      title: input.title,
      slug: GenerateSlug(input.title),
    });
    return new_category;
  }

  // is not working
  private async getIDbySlug(id: string) {
    const category = await Categories.findOne({ _id: id });
    if (category) {
      return category.slug;
    } else {
      return null; // Return null if the category with the specified ID is not found
    }
  }
  public async deleteCategory(input: CategoryInput) {
    const categorys = await Categories.findOne({ slug: input.slug });
    if (!categorys) {
      throw generateError(
        ` [ ${input.slug} ] is not found !`,
        HttpStatusCodes.NOT_FOUND
      );
    }

    const countMovie = await Movie.countDocuments({
      category: categorys.id,
    });
    if (countMovie > 0) {
      throw generateError(
        "Cannot delete categories with associated Movie",
        HttpStatusCodes.CONFLICT
      );
    }
    const category = await Categories.findOne({
      slug: input.slug,
    });
    if (!category) {
      throw generateError("Category not found", HttpStatusCodes.NOT_FOUND);
    }
    await Categories.deleteOne({ slug: input.slug });
  }

  // is not working

  public async deleteCategoryByID(input: CategoryInput) {
    const CategoriesId = await Categories.findOne({ _id: input.id });
    if (!CategoriesId) {
      throw generateError(
        ` [ ${input.id} ] is not found !`,
        HttpStatusCodes.NOT_FOUND
      );
    }
    const countMovie = await Movie.countDocuments({
      category: input.id,
    });
    console.log("countMovie", countMovie);
    if (countMovie > 0) {
      throw generateError(
        "Cannot delete categories with associated Movie",
        HttpStatusCodes.CONFLICT
      );
    }
    const category = await Categories.findOne({
      _id: input.id,
    });
    if (!category) {
      throw generateError("Category not found", HttpStatusCodes.NOT_FOUND);
    }
    await Categories.deleteOne({ _id: input.id });
  }
}

export default new categoriesServices();
