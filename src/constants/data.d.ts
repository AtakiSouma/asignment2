
 // User Schema
export interface UserSchema {
  username: string;
  password:string;
  email: string;

}
export interface searchQueryInput {
title: string;

}
export interface UserInput{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;

    avatar: string;
    
}
export interface MovieInput{
  name: string ; 
  slug: string;
  description: string ;
  titleImage: string ;
  image: string ;
  category:string ;
  language: string ;
  year: number
  time: number;
  video: string ;
  rate:number;
}

export interface CategoryInput {
  title: string; 
  slug: string;
  id: string;
}
export interface tokenGenerate {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  username?: string;
}

export interface loginInput {
  email: string;
  password: string;
}
export interface inputFindOne {
  id: string;
  slug: string;
  status: boolean;
}
