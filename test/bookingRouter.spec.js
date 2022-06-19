const { expect } = require('chai'); // Library to clean and easy syntax
const request = require('supertest'); //library for http agent
const app1=require("../src/app")

//test cases for "/getBookings/userId" route
describe('testing booking router file', async () => {
    it('test case', async() => {
           let res=await request(app1).get("/getBookings/:userId")
           expect(res.body.message).not.to.equal("Cannot fetch the data from User Collection");
         });
    
         it('test case', async() => {
            let res=await request(app1).get("/getBookings/:userId")
            expect(res.charset).to.equal('utf-8');
            
          });
       
          
         it('test case', async() => {
            let res=await request(app1).get("/getBookings/:userId")
            expect(res.type).to.equal('application/json');
          });


        });
      
        
        
        
            
            
            
        
   

