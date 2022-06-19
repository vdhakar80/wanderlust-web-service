const db = require( "../model/package" )
const hotDealsService = {}


/*fetching the hot deals 
* if response is true returning the response 
* else if throwing the error with status 404 
*/
hotDealsService.getHotDeals = async () => {
   
        let data = await db.getHotDeals();
        if( data ) {
            return data;
        }
        else{
            let err = new Error( "Cannot fetch the data from hot deals" );
            err.status = 404;
            throw err;

        }
    
}

/*fetching the searched packages irrespective of the case sensitivity
* if response is true returning the response 
* else if throwing the error with status 404 
*/
hotDealsService.getPackagesBySearch = async ( name ) => {
    
        name = name.toLowerCase();
        let continent = name.substring( 0, 1 ).toUpperCase() + name.substring( 1, name.length )
        let data = await db.getPackageBySearch( continent );
        if( data ) {
            return data;
        }
        else{
            let err = new Error( "Cannot fetch the details from the continents" );
            err.status = 404;
            throw err;
        }
    

}



module.exports = hotDealsService;