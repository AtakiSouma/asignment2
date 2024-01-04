import mongoose from "mongoose";
import { StringLiteral } from "typescript";

 export interface IUsers {
    username: string;
    email: string;
    password: string;
    token?: string;
    avatar?: string;
  }
  

  export interface IMovies {
    name: string ; 
    slug: string;
    description: string ;
    titleImage: string ;
    image: string ;
    category: mongoose.Types.ObjectId | ICategories ;
    language: string ;
    year: number
    time: number;
    video: string ;
    rate:number;
    status:boolean;
    categorySlug: string
  }

  export interface ICategories {
    title: string;
    slug: string;
  }
  export interface ITokens {
    user: mongoose.Types.ObjectId | IUsers ;
    token: string;
  }