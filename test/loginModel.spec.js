const { expect } = require('chai'); // Library to clean and easy syntax
const request = require('supertest'); //library for http agent
const loginModel= require('../src/model/userslogin');

//generate user Id method
describe('checking genertate user Id method of model', async() => {
    it('checking user id to be string', async() => {
        let data=await loginModel.generateUserId();
        expect(data).to.be.a('string');
    });
    it('checking user Id should start with U',async()=>{
        let data=await loginModel.generateUserId();
        expect(data[0]).to.equal('U');
    })
});

//check user method
describe('checking check user method of model', async() => {
    it('checking contact no', async() => {
        let data=await loginModel.checkUser(9876543210);
        expect(data.userId).to.equal('U1004');
    });
});

//get password method
describe('checking get password method of model', async() => {
    it('checking password sholud not be null', async() => {
        let data=await loginModel.getPassword(9876543210);
        expect(data).not.to.equal(null);
    });
    it('checking password length greater than 0', async() => {
        let data=await loginModel.getPassword(9876543210);
        expect(data).to.have.length.greaterThan(0);
    });
});

//validate user method
describe('checking validate user method of model', async() => {
    it('checking user Id', async() => {
        let data=await loginModel.validateUser(8818900965);
        expect(data).to.equal('U1003');
    });
});



