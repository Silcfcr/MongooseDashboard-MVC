const express = require( 'express' );
const MongooseRouter = express.Router();
const { UserController } = require('./../controllers/userController');

MongooseRouter
    .route("/mongooses/new")
    .get(UserController.view)

MongooseRouter
    .get("/", UserController.viewAll)

MongooseRouter
    .post("/mongooses", UserController.add)

MongooseRouter
    .get("/mongooses/edit/:id", UserController.editGet)

MongooseRouter
    .post( '/mongooses/:id', UserController.edit)

MongooseRouter
    .get('/mongooses/destroy/:id', UserController.destroy)

MongooseRouter
    .get('/users/getById', UserController.getById)

MongooseRouter
    .get( '/users/:id', UserController.users)

module.exports = {MongooseRouter}