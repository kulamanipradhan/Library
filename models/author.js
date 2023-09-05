const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

authorSchema.pre('deleteOne', function(next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err)
    } else if (books.length > 0) {
      next(new Error('This author has books still'))
    } else {
      next()
    }
  })
})
// authorSchema.pre("deleteOne", function (next) {
//   console.log("Inside pre");
//   Book.find({ author: this.id }, (err, books) => {
//     console.log("inside book.find");
//     if (err) {
//       console.log("inside if(err)");
//       next(err);
//     } else if (books.length > 0) {
//       console.log("inside book.length");
//       next(new Error("This author has books still"));
//     } else {
//       console.log("inside last else");
//       next();
//     }
//   });
// });

module.exports = mongoose.model('Author', authorSchema)