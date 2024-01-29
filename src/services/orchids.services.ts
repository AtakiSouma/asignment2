import HttpStatusCodes from "../constants/HttpStatusCodes";
import { generateError } from "../libs/handlers/errorsHandlers";
import { Categories, ICategories } from "../models/Categories";
import { Orchids } from "../models/Orchids";
import GenerateSlug from "../util/GenerateSlug";
import DataOrchids from "../data/OrchidData";
import mongoose from "mongoose";
import { link } from "joi";
import { query } from "express";
interface IOrchids {
  name: string;
  slug: string;
  image: string;
  background: string;
  nation: string;
  revenue: number;
  rating: number;
  development: string;
  category: string | mongoose.Types.ObjectId | ICategories;
  release_date: Date;
}
interface IOrchidUpdateOptions {
  name: string;
  slug: string;
  image: string;
  background: string;
  nation: string;
  revenue: number;
  rating: number;
  development: string;
  category: mongoose.Types.ObjectId | ICategories;
  release_date: Date;
}

interface IParam {
  slug: string;
}

class OrchidsServices {
  public async importOrchids() {
    await Orchids.deleteMany();
    const orchids = await Orchids.insertMany(DataOrchids);
    return orchids;
  }

  public async createNewOrchid({
    name,
    slug,
    image,
    background,
    nation,
    release_date,
    revenue,
    rating,
    development,
    category,
  }: IOrchids) {
    // check if exist Orchids
    const existOrchid = await Orchids.findOne({ slug: slug });
    if (existOrchid) {
      throw generateError("Orchid already exists", HttpStatusCodes.CONFLICT);
    }
    // check if category not found
    const isExist = await Categories.findById({ _id: category });
    if (!isExist) {
      throw generateError("Category Not Found", HttpStatusCodes.NOT_FOUND);
    }

    // create new Orchid
    const newOrchid = await Orchids.create({
      name: name,
      slug: GenerateSlug(name),
      image: image,
      background: background,
      nation: nation,
      release_date: release_date,
      revenue: revenue,
      rating: rating,
      development: development,
      category: category,
    });
    return newOrchid;
  }

  public async updateOrchidBySlug({
    name,
    slug,
    image,
    background,
    nation,
    release_date,
    revenue,
    rating,
    development,
    category,
  }: IOrchidUpdateOptions) {
    const orchid = await Orchids.findOne({ slug: slug });
    if (orchid) {
      orchid.name = name || orchid.name;
      orchid.image = image || orchid.image;
      orchid.background = background || orchid.background;
      orchid.nation = nation || orchid.nation;
      orchid.release_date = release_date || orchid.release_date;
      orchid.revenue = revenue || orchid.revenue;
      orchid.rating = rating || orchid.rating;
      orchid.development = development || orchid.development;
      orchid.category = category || orchid.category;
    }
    const updateOrchid = await orchid?.save();
    return updateOrchid;
  }

  public async getAllOrchid(search: string, page: number, limit: number) {
    try {
      const query = {
        status: true,
        name: { $regex: new RegExp(search, "i") },
      };
      const orchidList = await Orchids.find(query)
        .populate("category")
        .sort({ create_at: "desc" })
        .skip((page - 1) * limit)
        .limit(limit);
      const totalCount = await Orchids.countDocuments(query);
      const data = orchidList.map((orchid) => {
        const releaseDate = new Date(orchid.release_date);
        const year = releaseDate.getFullYear();
        const month = String(releaseDate.getMonth() + 1).padStart(2, "0");
        const day = String(releaseDate.getDate()).padStart(2, "0");

        return {
          id: orchid._id,
          name: orchid.name,
          status: orchid.status,
          slug: orchid.slug,
          image: orchid.image,
          background: orchid.background,
          nation: orchid.nation,
          revenue: orchid.revenue,
          rating: orchid.rating,
          development: orchid.development,
          release_date: `${year}-${month}-${day}`,
          category: orchid.category,
        };
      });

      const response = {
        data,
        totalCount,
        pageCount: Math.ceil(totalCount / limit),
      };
      return response;
    } catch (error) {
      console.log(error);
      throw generateError("Cannot get orchids!", HttpStatusCodes.BAD_REQUEST);
    }
  }

  public async getOneOrchid({ slug }: IParam) {
    const Orchid = await Orchids.findOne({ slug: slug }).populate("category");
    if (!Orchid) {
      throw generateError("Orchid not found!", HttpStatusCodes.NOT_FOUND);
    }
    const formattedOrchid = {
      ...Orchid.toObject(), 
      release_date: formatDate(Orchid.release_date),
    };
    return formattedOrchid;
  }
  
  public async DeleteOneOrchid({ slug }: IParam) {
    const Orchid = await Orchids.findOneAndDelete({ slug: slug });
    if (!Orchid) {
      throw generateError("Orchid not found!", HttpStatusCodes.NOT_FOUND);
    }

   
    return HttpStatusCodes.OK;
  }
}

export default new OrchidsServices();




function formatDate(date: Date): string {
  const releaseDate = new Date(date);
  const year = releaseDate.getFullYear();
  const month = String(releaseDate.getMonth() + 1).padStart(2, "0");
  const day = String(releaseDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
