import supertest from "supertest";
import { app } from "../app.js";
import User from "../models/User.js";
// import { decode } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
// import app from '../app';
// import mongoose from 'mongoose'

describe("Test User.................", () => {
  beforeEach(async () => {
    await User.create({
      name: "test",
      password: "rahasia",
      email: "test@mail.com",
    });
  });
  afterEach(async () => {
    await User.deleteOne({
      name: "test",
    });
  });

 

  it("should can register new user /api/v1/auth/register", async () => {
    const result = await supertest(app).post("/api/v1/auth/register").send({
      name: "test2",
      password: "rahasia2",
      email: "test2@mail.com",
    });
    expect(result.status).toBe(201);
    await User.deleteOne({
        name: "test2",
      });
  });

  it("Test user login sukses /api/v1/auth/login", async () => {
    const result = await supertest(app).post("/api/v1/auth/login").send({
      name: "test",
      password: "rahasia",
      email: "test@mail.com",
    });
    // console.log("===set-cookie===========")
    // console.log((result.header['set-cookie'][0]).split('; ')[0])
    expect(result.status).toBe(200);
    // expect(result.body.data.name).toBe("test");
    // expect(result.body.data.email).toBe("test@mail.com");
  });

  it("Test user login Gagal /api/v1/auth/login", async () => {
    const result = await supertest(app).post("/api/v1/auth/login").send({
      name: "test",
      password: "rahasia_salah",
      email: "test@mail.com",
    });

    // let token;
    // token = req.cookies.jwt

    // let decode;
    // decode = await jwt.verify(token, process.env.JWT_SECRET)
    // console.log("============decode===================")
    // console.log(decode)

    expect(result.status).toBe(400);
    expect(result.body.message).toBe("Invalid User");
  });






  //----belum---- login
  it("should getUser-->no cookies /api/v1/auth/getUser ", async () => {

    const resultLogin = await supertest(app).post("/api/v1/auth/login").send({
      name: "mugi3",
      password: "12345678",
      email: "mugi3@mail.com",
    });


    // console.log("===getUser resultLogin===========")
    // console.log((resultLogin.header['set-cookie'][0]).split('; ')[0])
    let cookiezonk=''
    let cookies = ((resultLogin.header['set-cookie'][0]).split('; ')[0])
    const result = await supertest(app).get("/api/v1/auth/getUser")
    .set( {'Cookie':cookies});
    // .set( {'Cookie':cookiezonk});

    // console.log("kkkkkkkkkkkkkk : "+JSON.stringify(result.text))
    console.log(JSON.stringify(result.text))
    expect(result.status).toBe(200);
  });



  it("should logout  /api/v1/auth/logout ", async () => {
    const result = await supertest(app).get("/api/v1/auth/logout");
    expect(result.status).toBe(200);
  });
});
