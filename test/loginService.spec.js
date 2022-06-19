const { expect } = require('chai'); // Library to clean and easy syntax
const request = require('supertest'); //library for http agent
const { notify } = require('../src/routes/userRouter');
const loginService= require('../src/service/userslogin');

describe('checking login method of service', async() => {
    it('checking login credentials', async() => {
        let data=await loginService.login(8818900965,"Vicky@123");
        expect(data).not.to.equal(null);
    });
    it('checking contact no', async() => {
        let data=await loginService.login(8818900965,"Vicky@123");
        expect(data).to.have.property('contactNo');
    });
    it('getting user Id', async() => {
        let data=await loginService.login(9876543210,"Mansi@123");
        expect(data.userId).to.equal('U1004');
    });
});