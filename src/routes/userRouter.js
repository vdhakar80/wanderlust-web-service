const express = require( 'express' );
const router = express.Router();
const setupUser = require( "../model/setupUser" )

const userservice = require( '../service/userslogin' )

/**
 * @route Get /setup
 * @desc setup user
 * @access public
 */

router.get( "/setup", ( req, res, next ) => {
    setupUser.userSetup().then( ( data ) => {
        res.send( data )
    } ).catch( err => next( err ) );
} )

/**
 * @route post /login
 * @desc route which allows user to logged in
 * @access public
 */

//router to login
router.post( '/login', function ( req, res, next ) {
    let contactNo = req.body.contactNo;
    let password = req.body.password;
    userservice.login( parseInt( contactNo ), password ).then( function ( userDetails ) {
        res.json( userDetails );
    } ).catch( err => next( err ) );
} )

/**
 * @route Post /register
 * @desc route which allows user for registration
 * @access public
 */

//router to register
router.post( '/register', ( req, res, next ) => {
    let userObj = req.body
    userservice.registeruser( userObj ).then( ( data ) => {
        res.json( data )
    } ).catch( ( err ) => {
        next( err );
    } )
} )


module.exports = router;

