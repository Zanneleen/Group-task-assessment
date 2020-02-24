const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the Scema to be used for the database
const todoSchema = new Schema({
  task: { type: String, required: true, trim: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const ToDo = mongoose.model('ToDO', todoSchema)

module.exports = ToDo;

// module.exports.getUserTasks = function(userId, callback){
//   var query = {'userId': userId}; 
//   Task.find(query, callback);
// }