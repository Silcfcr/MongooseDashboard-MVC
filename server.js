const express = require( 'express' );
require( './server/config/database' );

const {UserModel} = require( './server/models/userModel' );
const {MongooseRouter} = require("./server/routes/mongooseRouter");

const app = express();

app.set( 'views', __dirname + '/client/views' );
app.set( 'view engine', 'ejs' );


app.use( express.urlencoded({extended:true}) );
app.use("", MongooseRouter)

app.listen( 3000, function(){
    console.log( "The users server is running in port 3000." );
});