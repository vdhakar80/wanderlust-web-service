const connection = require( "../utilities/connections" )

const hotDealsDB = {}

//model for the hot deals
hotDealsDB.getHotDeals = async () => {
    let model = await connection.getDestinationCollection();
    let data = await model.find( { discount: { $gt: 0 } } )
    if( data.length >= 0 ) {
        return data;
    }
    else{
        return null;
    }
}

//model for searched packages
hotDealsDB.getPackageBySearch = async ( name ) => {

    let model = await connection.getDestinationCollection();
    let data = await model.find( { "$or": [{ "continent": { $regex: name } }, { "name": { $regex: name } }] }, )
    if( data.length > 0 ) {
        return data;

    }
    else{
        return null;
    }
}

//model to update the availability of the package 
hotDealsDB.updateAvailablibility = async ( destId, noOfPersons ) => {

    let model = await connection.getDestinationCollection();
    let data = await model.updateOne( { destinationId: destId }, { $inc: { availability: noOfPersons } } )
    if( data.nModified > 0 ) {
        return true;
    }
    else{
        return false;
    }



}

module.exports = hotDealsDB;