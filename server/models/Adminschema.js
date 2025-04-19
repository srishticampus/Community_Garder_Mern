var mongoose=require("mongoose");
  
  var AdminSchema=mongoose.Schema({
      emailId: {
          type:String,
          required:true
      },
      
      password: {
          type:String,
          required:true
      },
      createdAt: { type: Date, default: Date.now }

  });
  
  const Admin=mongoose.model('admin',AdminSchema);
  
  module.exports = Admin;