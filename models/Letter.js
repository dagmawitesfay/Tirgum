

const mongoose = require("mongoose");

const LetterSchema = new mongoose.Schema({
  title: {
    type: String,
    required : true,
    lowercase : true,
    trim : true
  },
  sender: {
    type: String,
    required : true ,
    lowercase : true,
    trim : true
  },
   urgency: {
    type: String,
    enum : ["urgent", "soon","no-rush"],
    required : true
  },
  category: {
    type: String,
    enum : ["benefits","health","immigration","housing","school","other"] , 
    required : true
  },

  deadline: {
    type : Date, default : null , // either real date or no deadline
  },
  deadlineNote: {
    type: String,
  },
  summary : {
    type : String,
    required: true
  } , 
  consequence : {
    type : String,
    required: true
  } , 
  steps: [{
    text: { type: String, required: true },
    done: { type: Boolean, default: false }
  }],
  language: {
    type: String,
    enum : ["en","am","es"] , default : "en"
  },

  keyTerms: [{
    term: { type: String, required: true },
    meaning: { type: String, required: true }
  }]
}, {
  timestamps: true // created for all letters
});

module.exports = mongoose.model("Letter", LetterSchema);
