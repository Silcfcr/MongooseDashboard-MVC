const express = require( 'express' );
const mongoose = require( 'mongoose' );

//if the db doesnt exist this will add it for us
mongoose.connect('mongodb://localhost/animals_db', {useNewUrlParser: true});

const {UserModel} = require( './models/userModel' );

// This package is deprecated, use instead the jsonParser integrated within express
// Look at line 12 for the usage
//const bodyParser = require( 'body-parser' );
const app = express();

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

// This code is deprecated, use instead line 10
//app.use( bodyParser.urlencoded({extended:true}) );
app.use( express.urlencoded({extended:true}) );

app.get( '/mongooses/new', function( request, response ){
    response.render( 'index' );  
});

app.get( '/', function( request, response ){
    UserModel
        .getUsers()
        .then( data => {
            console.log( data );
            response.render( 'viewAll', { users : data } );
        });
});

app.get( '/users/getById', function( request, response ){
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
});

app.get( '/users/:id', function( request, response ){
    let id = Number( request.params.id );

    UserModel
        .getUserById( id )
        .then( result => {
            if( result === null ){
                throw new Error( "That user doesn't exist" );
            }
            console.log(result);
            response.render( 'animal', { found: true, user: result } );
            
        })
        .catch( error => {
            response.render( 'animal', { found: false } );
        });
});

app.post( '/mongooses', function( request, response ){
    console.log( request.body );
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
            console.log( result );
        })
        .catch( err => {
            console.log( "Something went wrong!" );
            console.log( err );
        })

    response.redirect( '/' );
});

app.get( '/mongooses/edit/:id', function( request, response ){
    let id = Number( request.params.id );
    UserModel
        .getUserById( id )
        .then( result => {
            if( result === null ){
                throw new Error( "That user doesn't exist" );
            }
            console.log(result);
            response.render( 'animalUpdate', { found: true, animal: result } );
            
        })
        .catch( error => {
            response.render( 'animalUpdate', { found: false } );
        });
});

app.post( '/mongooses/:id', function( request, response ){
    console.log( request.body );
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
            console.log( result );
        })
        .catch( err => {
            console.log( "Something went wrong!" );
            console.log( err );
        })

    response.redirect( '/' );
});

app.get( '/mongooses/destroy/:id', function( request, response ){
    let id = Number( request.params.id );

    UserModel.removeAnimal(id)
        .then( result => {
            console.log(result);
            response.redirect( '/' );
            
        })
        .catch( error => {
            console.log("There was an error while deleting")
            response.redirect( '/' );
        });
});

app.listen( 5000, function(){
    console.log( "The users server is running in port 5000." );
});