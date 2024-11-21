import supertest from "supertest"
import {app}  from "../app.js"
// import app from '../app';
// import mongoose from 'mongoose'

describe('coba test pertama', () => {
    // afterEach(async () => {
    //     await removeTestUser();
    // });

    
it('should getUser /api/v1/auth/getUser ', async () => {
    const result = await supertest(app)
    .get("/api/v1/auth/getUser")
    expect(result.status).toBe(200);
    
});

it('should logout  /api/v1/auth/logout ', async () => {
    const result = await supertest(app)
    .get("/api/v1/auth/logout")
    expect(result.status).toBe(200);
    
});

it('should can register new user /api/v1/auth/register', async () => {
    const result = await supertest(app)
        .post('/api/v1/auth/register')
        .send({
            name: 'test2',
            password: 'rahasia2',
            email: 'test2@mail.com'
        });
        console.log((JSON.parse(result.text)).data)
    expect(result.status).toBe(201);   
});

});