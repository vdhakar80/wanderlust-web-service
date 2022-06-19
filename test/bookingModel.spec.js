const { expect } = require('chai'); // Library to clean and easy syntax
const request = require('supertest'); //library for http agent
const bookingModel= require('../src/model/booking')

//test cases for getByUserId()
describe('Getting the details by userId', async() => {
    it('getting the data with the help of UserId', async() => {
        let data=await bookingModel.getByUserId("U1001")
        expect(data).not.to.equal(null);
    });

    it('checking the mandatory fields of the User' , async() => {
        let data=await bookingModel.getByUserId("U1002")
        
    expect(data).to.have.property("contactNo");
    });

    it('checking the UserId be a type of String' , async() => {
        let data=await bookingModel.getByUserId("U1002")
        
    expect(data.userId).be.a('String')
    });
});


//test cases for getByBookingId()
describe('Getting the details of the bookings', async() => {
   
    it('getting the data with the help of bookingId', async() => {
   let data=await bookingModel.getByBookingId("B1002")
        expect(data).not.to.equal(null);
    });

    it('checking the no of persons who can do booking', async() => {
        let data=await bookingModel.getByBookingId("B1002")
             expect(data.noOfPersons).lt(5);
         });


         it('booking data should have userId', async() => {
            let data=await bookingModel.getByBookingId("B1003")
                 expect(data).to.have.property("userId");
             });
});
//test cases for generateId()
describe('Generating the userId', async() => {
   
    it( 'checking the booking Id of type String', async() => {
    let data=await bookingModel.generateId()
    expect(data).be.a('String');
    })

    it( 'checking the Booking Id not to be NULL', async() => {
   
        let data=await bookingModel.generateId()
     expect(data).not.to.equal(null);
});

it('Booking Id should start with B',async()=>{
  let data=await bookingModel.generateId()
 expect(data[0]).to.equal('B');
})
});




