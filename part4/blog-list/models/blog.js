const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
  },
  author: {
    type: String,
    minlength: 5,
  },
  url: {
    type: String,
    minlength: 5,
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // comments: [ String ] // to work with solution front end

  comments: [
    // to work with my own
    {
      comment: String,
      date: String,
    },
  ],
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
