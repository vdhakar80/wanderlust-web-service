const db = require( "../model/booking" )
const destModel=require( "../model/package" );
const bookingsService = {}

/*getting booking data of the user
* if response is true returning the response 
* else if throwing the error with status 404 
*/
bookingsService.getBookingDeals = async ( userId ) => {
    try{
        let data = await db.getByUserId( userId );
        if( data ) {
            let bookings = data.bookings;
            let bookingData = [];
            for( let booking of bookings ) {
                let book = await db.getByBookingId( booking );
                bookingData.push( book );
            }
            return bookingData;
        }
        else{
            let err = new Error( "Cannot fetch the data from User Collection" );
            err.status = 404;
            throw err;

        }
    }
    catch( err ) {
        console.log( err.message )
    }
}


/*fetching  the form data by booking id and updating the availaibility
* if response is true returning the response 
* else if throwing the error with status 500
*/
bookingsService.createBooking = async ( dest, formdata, userId, checkOutDate, totalCharges ) => {
    try{
        let cInDate = new Date( formdata.checkInDate );
        let cOutDate = new Date( checkOutDate );
        if( formdata.noOfPersons>dest.availability )
        {
            let err = new Error( "only "+dest.availability+" packages are left" );
            err.status = 500;
            throw err;
        }
        else
        {
            let updatedata=destModel.updateAvailablibility( dest.destinationId,-formdata.noOfPersons );
            if( !updatedata )
            {
                let err = new Error( "Unable to update availability" );
                err.status = 500;
                throw err;
            }
        }
        let bookingId = await db.generateId();
        let bookingData = {
            bookingId: bookingId,
            destId: dest.destinationId,
            userId: userId,
            destinationName: dest.name,
            checkInDate: cInDate,
            checkOutDate: cOutDate,
            noOfPersons: formdata.noOfPersons,
            totalCharges: totalCharges,
            timeStamp: new Date().getTime().toString()
        }
        let data = await db.createBooking( bookingData, userId )
        if( data ) {
            return data;
        }
        else{
            let err = new Error( "Cannot create booking" );
            err.status = 404;
            throw err;
        }
    }
    catch( err ) {
        throw err;
    }
}

//cancelling the booking details and updating the availaibility
bookingsService.cancelBooking = ( bookingId, userId ,destId,noOfPersons ) => {
    let status = db.cancelBooking( bookingId, userId );
    let updateAvailability=destModel.updateAvailablibility( destId,noOfPersons )
    if( status ) {
        return status;
    }
}

module.exports = bookingsService;
