const userDB = require( '../model/userslogin' );

const userService = {}

/*login a user by contact no. and password
* if response is true returning the response 
* else if throwing the error with status 404 
*/
userService.login = ( contactNo, userPassword ) => {
    return userDB.checkUser( contactNo ).then( ( user ) => {
        if( user == null ) {
            let err = new Error( "Enter registered contact number! If not registered, please register" )
            err.status = 404
            throw err
        }
        else{
            return userDB.getPassword( contactNo ).then( ( password ) => {
                if( password != userPassword ) {
                    let err = new Error( "Incorrect password" )
                    err.status = 406
                    throw err
                }
                else{
                    return user;
                }
            } )
        }
    } )
}

/*register an user by checking the if the user already exists
* if already exist then throwing the error withnstatus 406 
* else if registring the new user with the given details
* if error throwing an error with status 500
*/
userService.registeruser = ( userObj ) => {
    return userDB.validateUser( userObj.contactNo ).then( ( user ) => {
        if( user ) {
            let err = new Error( "User already exists with given contact number" )
            err.status = 406
            throw err;
        } else{
            return userDB.registerUser( userObj ).then( ( data ) => {
                if( data.length > 0 ) {
                    return data
                } else{
                    let err = new Error( "Registration Failed! Please Try Again" )
                    err.status = 500
                    throw err
                }
            } )
        }
    } )
}


module.exports = userService
