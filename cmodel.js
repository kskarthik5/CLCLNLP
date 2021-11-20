const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    cid: {
        type: String,
        required: true,
        unique : true,
      },
    visits: {
        type: String,
      },
    hearts: {
        type: String,
        },
  });
  
  const Course = mongoose.model("courses", Schema);
  
  module.exports = Course;