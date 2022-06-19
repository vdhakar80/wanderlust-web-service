const { expect } = require('chai'); // Library to clean and easy syntax
const request = require('supertest'); //library for http agent
const app = require("../src/app");

describe('testing user router file', async () => {
    it('checking the setup path', async() => {
           let res=await request(app).get("/user/setup")
           expect(res.body.message).not.to.equal("Cannot fetch the data from hot deals");
         });
    
         it('checking for status code', async() => {
            let res=await request(app).get("/user/setup");
            expect(res.status).to.equal(200);
          });   
     });