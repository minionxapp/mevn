import supertest from "supertest";
import { app } from "../app.js";
// import User from "../models/User.js";


export const getCookie = async()=>{
    const result = await supertest(app).post("/api/v1/auth/login").send({
        name: "mugi3",
        password: "12345678",
        email: "mugi3@mail.com",
      });
      return ((result.header['set-cookie'][0]).split('; ')[0])

}

export const getCookieAdmin = async()=>{
  const result = await supertest(app).post("/api/v1/auth/login").send({
      name: "test3",
      password: "12345678",
      email: "test3@mail.com",
    });
    return ((result.header['set-cookie'][0]).split('; ')[0])

}

export const getCookieByUserLogin = async( userEmail, userPassword)=>{
  const result = await supertest(app).post("/api/v1/auth/login").send({
      name: "mugi3",
      password: userPassword,
      email: userEmail,
    }); 
    return ((result.header['set-cookie'][0]).split('; ')[0])
}

export const createUserLogin = async( userName,userEmail, userPassword)=>{
  const result = await supertest(app).post("/api/v1/auth/register").send({
    name: userName,
    password: userPassword,
    email: userEmail,
  });
    return (result)
}