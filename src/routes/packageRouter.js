const express = require( 'express' );
const router = express.Router();

const packageService = require( "../service/package" );

/**
 * @route Get /hotdeals
 * @desc route which allows fetching hot deals
 * @access public
 */

router.get( "/getHotDeals", async ( req, res, next ) => {
    try{
        let data = await packageService.getHotDeals();
        res.json( data );
    }
    catch( err ) {
        next( err )
    }
} )

/**
 * @route Get /packages
 * @desc route which allows to fetch the packages
 * @access public
 */

router.get( "/getPackages/:continent", async ( req, res, next ) => {
    try{
        let data = await packageService.getPackagesBySearch( req.params.continent );
        res.json( data );
    }
    catch( err ) {
        next( err );
    }
} )
module.exports = router;
