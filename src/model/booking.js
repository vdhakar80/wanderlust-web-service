const collection = require( "../utilities/connections" )
const connection = require( "../utilities/connections" )

const bookingModel = {}

// model fetch the user by User Id
bookingModel.getByUserId = async ( userId ) => {
    let model = await connection.getUserCollection();
    let data = await model.findOne( { userId: userId }, { _id: 0 } )
    if( data ) {
        return data;
    }
    else{
        return null;
    }
}

//model to fetch bookings by booking Id
bookingModel.getByBookingId = async ( bookingId ) => {
    let model = await connection.getBookingCollection();
    let data = await model.findOne( { bookingId: bookingId }, { _id: 0 } )
    if( data ) {
        return data;
    }
    else{
        return null;
    }
}


//model to fetch the booking details
bookingModel.createBooking = async ( bookingData, userId ) => {
    let bookingModel = await connection.getBookingCollection();
    let bookingData1 = await bookingModel.create( bookingData );
    if( bookingData1 ) {
        let userModel = await connection.getUserCollection();
        let userData = await userModel.updateOne( { userId: userId }, { $push: { bookings: bookingData.bookingId } } )
        if( userData.nModified > 0 ) {
            return true;
        }
    }
    else{
        let err = new Error( "Unable to update the booking data " )
        err.status = 500;
        throw err;
    }
}

//model to generate booking Id
bookingModel.generateId = async () => {
    let model = await connection.getBookingCollection();
    let ids = await model.distinct( "bookingId" );
    let nid = ids.map( id => {
        let newId = id.substring( 1, id.length )
        let newNId = Number( newId )
        return newNId;
    } )
    let bId = Math.max( ...nid );
    let str = bId + 1;
    return"B" + str;
}

//model for cancellation of booking
bookingModel.cancelBooking = async ( bookingId, userId ) => {
    let bookingModel = await connection.getBookingCollection();
    let bookingData = await bookingModel.deleteOne( { bookingId: bookingId } )
    if( bookingData.deletedCount > 0 ) {
        let userModel = await connection.getUserCollection();
        let userData = await userModel.updateOne( { userId: userId }, { $pull: { bookings: bookingId } } )
        if( userData.nModified > 0 ) {
            return true;
        }
        else{
            let err = new Error( "Unable to delete booking id from user data" )
            err.status = 500;
            throw err;
        }
    }
    else{
        let err = new Error( "Unable to delete booking" )
        err.status = 500;
        throw err;
    }
}


module.exports = bookingModel;
