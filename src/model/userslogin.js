const userDetails = require( './beanClasses/users' );
const connection = require( "../utilities/connections" );
const collection = require( '../utilities/connections' );

const usersDB = {}

//generating user Id
usersDB.generateUserId = () => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.distinct( "userId" ).then( ( userId ) => {
            let ids = []
            for( let id of userId ) {
                ids.push( id.substr( 1 ) )
            }
            let Id = Math.max( ...ids )
            return"U" + ( Id + 1 )
        } )
    } )
}

//check the user existance by contact no.
usersDB.checkUser = ( contactNo ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.findOne( { "contactNo": contactNo } ).then( ( customerContact ) => {
            if( customerContact ) {
                return new userDetails( customerContact );
            }
            else return null;
        } )
    } )
}

//check the password entered is correct or not
usersDB.getPassword = ( contactNo ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.find( { "contactNo": contactNo }, { _id: 0, password: 1 } ).then( ( password ) => {
            if( password.length != 0 )
                return password[0].password;
            else
                return null;
        } )
    } )
}

//validating the contact if already exist
usersDB.validateUser = ( contactNo ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.find( { contactNo: contactNo }, { _id: 0, userId: 1 } ).then( ( userId ) => {
            if( userId.length != 0 ) {
                return userId[0].userId
            } else return null
        } )
    } )
}


//registering the new user
usersDB.registerUser = ( Obj ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return usersDB.generateUserId().then( ( userId ) => {
            let userObj = new userDetails( Obj )
            userObj.userId = userId
            return collection.insertMany( [userObj] ).then( ( res ) => {
                if( res.length > 0 ) {
                    return res
                } else return null
            } )
        } )
    } )
}


module.exports = usersDB;
