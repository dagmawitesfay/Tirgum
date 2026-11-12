
const mongoose = require("mongoose");

const HelpSchema = new mongoose.Schema({
    organizationName: {
    type: String,
    required : true,
  },
  category:{
    type:String,
    enum:["Health","Legal","Benefits","Housing","Immigration"],
    required : true
  } , 
  languageOffered:{
    type:[String],
    required:true
  },
  location : {
    type:String,
    required: true
  }, 
  whatToBring:{
    type:[String],
    required:true,
  }, 
  serviceFee:{
    type:String,
    required:true
  } , 
  organizationSummary: {
    type:String,
    required:true
  } , 
  website:{
    type:String,
    required: true
  } , 
  phone:{
    type:String,
    required: true
  }, 
   email:{
    type:String,
  },
  populationServed: {
    type:String, 
    required:true
  } , 

  workingHours:[{
    workingDay : {type:String, required:true },
    time : {type:String , required:true},
  }],
  service:{
    type:[String],
    required:true
  }
})

module.exports = mongoose.model("Help", HelpSchema);