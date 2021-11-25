const {UserModel} = require("./../models/userModel");

const UserController = {
    view : function( request, response ){
        response.render( 'index' );  
    },
    viewAll : function( request, response ){
        UserModel
            .getUsers()
            .then( data => {
                response.render( 'viewAll', { users : data } );
            });
    },
    add : function( request, response ){
        const name = request.body.name;
        const type = request.body.type;
        const age = Number(request.body.age);
    
        // Run validations to see if the 'id' is not already in the list
        const newAnimal = {
            name,
            type,
            age
        };
        console.log( newAnimal );
        UserModel
            .createUser( newAnimal )
            .then( result => {
            })
            .catch( err => {
                console.log( "Something went wrong!" );
                console.log( err );
            })
    
        response.redirect( '/' );
    },
    editGet : function( request, response ){
        let id = request.params.id;
        console.log(id);
        UserModel
            .getUserById( id )
            .then( result => {
                if( result === null ){
                    throw new Error( "That user doesn't exist" );
                }
                response.render( 'animalUpdate', { found: true, animal: result } );
                
            })
            .catch( error => {
                response.render( 'animalUpdate', { found: false } );
            });
    },
    edit : function( request, response ){
        let id = request.params.id;
        const name = request.body.name;
        const type = request.body.type;
        const age = Number(request.body.age);
    
        const newAnimal = {
            name,
            type,
            age
        };
        console.log( newAnimal );
        UserModel
            .updateAnimal( id, newAnimal )
            .then( result => {
            })
            .catch( err => {
                console.log( "Something went wrong!" );
                console.log( err );
            })
    
        response.redirect( '/' );
    },
    destroy : function( request, response ){
        let id = Number( request.params.id );
    
        UserModel.removeAnimal(id)
            .then( result => {
                response.redirect( '/' );
                
            })
            .catch( error => {
                console.log("There was an error while deleting")
                response.redirect( '/' );
            });
    },
    getById : function( request, response ){
        let id = Number( request.query.id );
    
        UserModel
            .getUserById( id )
            .then( result => {
                if( result === null ){
                    throw new Error( "That user doesn't exist" );
                }
                response.render( 'user', { found: true, user: result } );
            })
            .catch( error => {
                response.render( 'user', { found: false } );
            });
    },
    users : function( request, response ){
        let id = request.params.id;
    
        UserModel
            .getUserById( id )
            .then( result => {
                if( result === null ){
                    throw new Error( "That user doesn't exist" );
                }
                response.render( 'animal', { found: true, user: result } );
                
            })
            .catch( error => {
                response.render( 'animal', { found: false } );
            });
    }

}

module.exports = {UserController}