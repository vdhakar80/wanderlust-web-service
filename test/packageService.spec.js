const { expect } = require('chai'); // Library to clean and easy syntax
const request = require('supertest'); //library for http agent
const packageService= require('../src/service/package')


describe('checking get hot deals method of Service', async() => {
    it('checking first destination id', async() => {
        let data=await packageService.getHotDeals()
        expect(data[0].destinationId).to.equal("HD1001");
    });
    it('checking the data to not be null', async() => {
        let data=await packageService.getHotDeals()
        expect(data).not.to.equal(null);
    });
    it('getting the continent', async() => {
        let data=await packageService.getHotDeals()
        expect(data[0].continent).to.be.a('string');
    });
})


describe('checking get package by search method of service', async() => {
    it('checking the data should not be NULL', async() => {
        let data=await packageService.getPackagesBySearch("Australia")
        expect(data).not.to.equal(null)
    });
    it('getting the destination id', async() => {
        let data=await packageService.getPackagesBySearch("Europe")
        expect(data[0].destinationId).to.equal("D1001");
    });
    it('checking the flight charges', async() => {
        let data=await packageService.getPackagesBySearch("Australia")
        expect(data[0].flightCharges).to.equal(500);
    });
})