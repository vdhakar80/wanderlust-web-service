const { expect } = require('chai'); // Library to clean and easy syntax
const request = require('supertest'); //library for http agent
// const app = require('../src/routes/packageRouter'); //import server.js 
const app1=require("../src/app")

describe('testing package router file', async () => {
it('test case', async() => {
       let res=await request(app1).get("/getHotDeals")
       expect(res.body.message).not.to.equal("Cannot fetch the data from hot deals");
     });

     it('test case', async() => {
        let res=await request(app1).get("/getHotDeals")
        expect(res.status).to.equal(200);
      });
    });


      describe('testing package router file', async () => {
        it('test case', async() => {
               let res=await request(app1).get("/getPackages/:continent")
              expect(res.type).to.equal("application/json");
             });
        
             it('test case', async() => {
                let res=await request(app1).get("/getPackages/:continent")
                expect(res.status).to.equal(200);
              });
        
              it('test case', async() => {
                let res=await request(app1).get("/getPackages/:continent")
                expect(res.redirect).not.to.equal(true);
              });
    
    
})
