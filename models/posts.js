const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    name:String,
    likes:Number,
    content:String
});

module.exports = mongoose.model('Posts' , postsSchema)