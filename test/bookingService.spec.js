const { expect } = require('chai'); // Library to clean and easy syntax
const request = require('supertest'); //library for http agent
const bookingService= require('../src/service/booking')

//test cases for get booking deal method of service
describe('checking get booking deals method of service', async() => {
    it('checking the no of persons who can do the booking', async() => {
        let data=await bookingService.getBookingDeals("U1001")
        expect(data[0].noOfPersons).lt(5);
    });

    it('booking deal data should not be null', async() => {
        let data=await bookingService.getBookingDeals("U1001")
         expect(data).not.to.equal(null);
    });

    it('the booking must have destination id', async() => {
        let data=await bookingService.getBookingDeals("U1001")
        expect(data[0]).to.have.property("destId");
    });
});