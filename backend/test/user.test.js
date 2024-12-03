import supertest from "supertest";
import { app } from "../app.js";
import User from "../models/User.js";
// import fs from fs

import { getCookie, getCookieAdmin,createUserLogin,getCookieByUserLogin } from "./util.testing.js";
// import { isJSON } from "validator";

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

  it("User login sukses /api/v1/auth/login", async () => {
    const result = await supertest(app).post("/api/v1/auth/login").send({
      name: "test",
      password: "rahasia",
      email: "test@mail.com",
    });
    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.email).toBe("test@mail.com");
  });

  it("User login gagal email/pasword kosong /api/v1/auth/login", async () => {
    const result = await supertest(app).post("/api/v1/auth/login").send({
      name: "test",
      password: "",
      email: "test@mail.com",
    });
    expect(result.status).toBe(400);
    expect(result.body.message).toBe("Invalid User");
  });

  it("User login gagal invalid password /api/v1/auth/login", async () => {
    const result = await supertest(app).post("/api/v1/auth/login").send({
      name: "test",
      password: "rahasia_salah",
      email: "test@mail.com",
    });
    expect(result.status).toBe(400);
    expect(result.body.message).toBe("Invalid User");
  });

  //token cookies valid
  it("should getUser logged with valid cookies /api/v1/auth/getUser ", async () => {
    const result = await supertest(app)
      .get("/api/v1/auth/getUser").set({ Cookie: await getCookie() }); //set ke headers// ambil cookie untuk yang sudah login
    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("mugi3");
  });

  //token cookies invalid
  it("should can not getUser logged invalid cookies) /api/v1/auth/getUser ", async () => {
    const result = await supertest(app).get("/api/v1/auth/getUser")
      .set({ Cookie: await getCookie() + "pppp" }); //set ke headers// ambil cookie untuk yang sudah login
    expect(result.status).toBe(401);
    expect(JSON.parse(result.text).message).toBe("Token invalid")
  });

  it("should can not getUser before Log In /api/v1/auth/getUser ", async () => {
    const result = await supertest(app).get("/api/v1/auth/getUser");
    // .set( {'Cookie': await getCookie()});//set ke headers// ambil cookie untuk yang sudah login
    expect(result.status).toBe(401);
    expect(JSON.parse(result.text).message).toBe("Anda tidak boleh mengakases halaman ini" );
  });

  it("should can not getUser valid cookies and user has ben deleted /api/v1/auth/getUser ", async () => {
    //regiter new user
    await(createUserLogin('testCookies','testcookies@mail.com','12345678'))
    let cookiesUser = await getCookieByUserLogin('testcookies@mail.com','12345678')
    //delete user
    await User.deleteOne({name: "testCookies" });
    const result = await supertest(app).get("/api/v1/auth/getUser")
    .set( {'Cookie': cookiesUser});//set ke headers// ambil cookie untuk yang sudah login

    expect(result.status).toBe(401);
    expect(JSON.parse(result.text).message).toBe("User tidak ditemukan" );
  });


  it("should logout  /api/v1/auth/logout ", async () => {
    const result = await supertest(app).get("/api/v1/auth/logout");
    expect(result.status).toBe(200);
    expect(JSON.parse(result.text).message).toBe("logout Berhasil");
  });


// role test
  it("should testrole logged with valid role and cookies /api/v1/auth/testrole ", async () => {
    const result = await supertest(app)
      .get("/api/v1/auth/testrole")
      .set({ Cookie: await getCookieAdmin() }); //set ke headers// ambil cookie untuk yang sudah login
    expect(result.status).toBe(200);
    expect(result.text).toBe("berhasil");
  });

  it("should testrole logged with invalid role and valid cookies /api/v1/auth/testrole ", async () => {
    const result = await supertest(app)
      .get("/api/v1/auth/testrole")
      .set({ Cookie: await getCookie() }); //set ke headers// ambil cookie untuk yang sudah login
    expect(result.status).toBe(403);
    expect(JSON.parse(result.text).message).toBe("role anda tidak bisa mengakase halaman");
  });
}); //from describe
