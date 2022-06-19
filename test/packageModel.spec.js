const { expect } = require('chai'); // Library to clean and easy syntax
const request = require('supertest'); //library for http agent
const packageModel= require('../src/model/package')


describe('checking get hot deals method of model', async() => {
    it('checking data should not be Null', async() => {
        let data=await packageModel.getHotDeals()
        expect(data).not.to.equal(null);
    });
    it('checking  the data', async() => {
        let data=await packageModel.getHotDeals()
        expect(data).to.have.length.greaterThan(0);
    });
   
})


describe('checking get package by search method of model', async() => {
    it('checking the destination id', async() => {
        let data=await packageModel.getPackageBySearch("Asia")
        expect(data[0].destinationId).to.equal("D1008");
    });
    it('checking the discount of the package', async() => {
        let data=await packageModel.getPackageBySearch("Europe")
        expect(data[0].discount).to.equal(0);
    });
    it('checking no of Nights', async() => {
        let data=await packageModel.getPackageBySearch("Australia")
        expect(data[0]).to.have.property("noOfNights")
    });
})