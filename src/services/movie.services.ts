import HttpStatusCodes from "../constants/HttpStatusCodes";
import { generateError } from "../libs/handlers/errorsHandlers";
import { MovieInput, inputFindOne } from "../constants/data";
import { Categories } from "../models/Categories";
import { Movie } from "../models/Movies";
import GenerateSlug from "../util/GenerateSlug";
import DataMovies from "../data/MovieData";
class moviesServices {
  // import a lot of movies
  public async importMovies() {
    await Movie.deleteMany();
    const movies = await Movie.insertMany(DataMovies);
    return movies;
  }
  // create a new movoie
  public async createNewMovie(input: MovieInput) {
    // check if categories is not available/ invalid
    const categories = await Categories.findOne({ _id: input.category });
    if (!categories) {
      throw generateError(
        "Categories is not found !",
        HttpStatusCodes.NOT_FOUND
      );
    }
    const name = await Movie.findOne({ name: input.name });
    if (name) {
      throw generateError("Name is duplicated !", HttpStatusCodes.BAD_REQUEST);
    }

    const newMovie = await Movie.create({
      name: input.name,
      slug: GenerateSlug(input.name),
      description: input.description,
      titleImage: input.titleImage,
      image: input.image,
      category: categories.id,
      language: input.language,
      year: input.year,
      time: input.time,
      video: input.video,
      rate: input.rate,
    });
    return newMovie;
  }
  // list all movie
  public async getAllMovies(searchQuery: string) {

    let query = {};
    if(searchQuery) {
      query = {
        $or: [
          { name: { $regex: new RegExp(searchQuery, 'i') } },
          { description: { $regex: new RegExp(searchQuery, 'i') } },

        ]
      }
    }

    const allMovies = await Movie.find(query);
    return allMovies;
  }

  // get one movie
  // byId
  public async getASingleMovieById(input: inputFindOne) {
    const movieId = await Movie.find({ _id: input.id });
    if (movieId.length === 0) {
      throw generateError("Movie is not found !", HttpStatusCodes.NOT_FOUND);
    }
    const movie = await Movie.find({ id: movieId });
    return movie;
  }

  // get one movie
  // by slug
  public async getMovieBySlug(input: inputFindOne) {
    const slug = await Movie.findOne({ slug: input.slug });
    if (!slug) {
      throw generateError("Movie is not found", HttpStatusCodes.NOT_FOUND);
    }
    const movieSlug = await Movie.findOne({ slug: input.slug });
    return movieSlug;
  }

  public async getMovieBySlugWithoutInput(slug: string) {
    const movieSlug = await Movie.findOne({ slug: slug });
    return movieSlug;
  }

  // update a movie
  public async updateMovie(input: MovieInput) {
    const newMovie = await Movie.findOneAndUpdate(
      { slug: input.slug },
      {
        name: input.name,
        description: input.description,
        titleImage: input.titleImage,
        image: input.image,
        category: input.category,
        language: input.language,
        year: input.year,
        time: input.time,
        video: input.video,
        rate: input.rate,
        slug: GenerateSlug(input.name),
      },
      {
        new: true,
      }
    );
    if (!newMovie) {
      throw generateError("Movie is not found", HttpStatusCodes.NOT_FOUND!);
    }
    return newMovie;
    // handle it here
  }
  // delete a movie
  public async deleteMovie(input: inputFindOne) {
    const movie = await Movie.findOne({ slug: input.slug });
    if (!movie) {
      throw generateError("Movie is not found", HttpStatusCodes.NOT_FOUND!);
    }
    await movie.deleteOne();
    return HttpStatusCodes.OK;
  }
  // update a status of movie
  public async updateStatusMovie(input: inputFindOne) {
    const movie = await Movie.findOneAndUpdate(
      { slug: input.slug },
      {
        status: input.status,
      },
      {
        new: true,
      }
    );
    if (!movie) {
      throw generateError("Movie is not found", HttpStatusCodes.NOT_FOUND!);
    }
    return movie.status;
  }
}
export default new moviesServices();
