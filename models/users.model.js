const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the user Schema
const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.virtual('Todo', {
    ref: 'Todos',
    localField: '_id',
    foreignField: 'owner',
})

module.exports = User = mongoose.model('users', userSchema);

module.exports.getUserById = function(id, callback){
    var query = {_id: mongoose.mongo.ObjectId(id)}; 
    User.findOne(query, callback);
  }