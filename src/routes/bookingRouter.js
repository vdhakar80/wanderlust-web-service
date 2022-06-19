const express = require( 'express' );
const router = express.Router();

const bookingService = require( "../service/booking" );

/**
 * @route Get /bookings
 * @desc route which allows user to view bookings he already had booked
 * @access private
 */

router.get( "/getBookings/:userId", async ( req, res, next ) => {
    try{
        let data = await bookingService.getBookingDeals( req.params.userId )
        res.json( data );
    }
    catch( err ) {
        next( err )
    }
} )

/**
 * @route delete/bookings
 * @desc route which allows user to cancel the booking he already had booked
 * @access private
 */

router.delete( '/cancelBooking/:bookingId/:userId/:destId/:noOfPersons', ( req, res, next ) => {
    let bookingId = req.params.bookingId;
    let userId = req.params.userId;
    let destId=req.params.destId;
    let noOfPersons=req.params.noOfPersons;
    return bookingService.cancelBooking( bookingId, userId ,destId,noOfPersons ).then( ( data ) => {
        res.json( { message: "Successfully deleted the booking with id " + bookingId } );
    } ).catch( ( err ) => {
        next( err )
    } )
} )

/**
 * @route post /create booking
 * @desc route which allows user to create booking
 * @access private
 */

router.post( '/createBooking/:userId', ( req, res, next ) => {
    let dest = req.body.package;
    let formData = req.body.formData;
    let userId = req.params.userId
    let checkOutDate = req.body.checkOutDate;
    let totalCharges = req.body.totalCharges
    return bookingService.createBooking( dest, formData, userId, checkOutDate, totalCharges ).then( ( data ) => {
        res.json( { message: "Successfully added the booking of user " + userId } )
    } ).catch( ( err ) => {
        next( err )
    } )
} )
module.exports = router;