const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
    type : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
    age : {
        type : Number,
        required : true,
    }
});

// creates the collection
const User = mongoose.model( 'users', UserSchema );

const UserModel = {
    createUser : function( newUser ){
        return User.create( newUser );
    },
    getUsers : function(){
        return User.find();
    },
    getUserById : function( userId ){
        return User.findOne({ id : userId });
    },
    removeAnimal : function(userId) {
        console.log(userId);
        return User.deleteOne({ id : userId })
        
    },
    updateAnimal : function(userId) {
        return User.updateOne({id: userId})
    }


};

module.exports = {UserModel};
