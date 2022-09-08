const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String},
  passwordHash: { type: String, required: true },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(mongooseUniqueValidator)

const User = mongoose.model('User',userSchema)

module.exports = User