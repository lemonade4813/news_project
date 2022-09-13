const mongoose  = require('mongoose')

const newPostSchema = mongoose.Schema({
    title : {
        type : String,
        maxlength : 50 
    },
    link: {
        type : String,
        maxlength : 50
    },
    file:{
        type : String,
        minlength : 100
    },
    summary : {
        type : String,
        maxlength : 50
    },
    })

    const NewPost = mongoose.model('NewPost', newPostSchema)

    module.exports = {NewPost}