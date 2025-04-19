var express=require("express");
var usercontroller=require("./Controllers/gardnercontroller");
var admincontroller=require("./Controllers/Admincontroller");
var orgcontroller=require("./Controllers/Organizationcontroller");

var route=express.Router();

route.post('/gardner/register',usercontroller.uploadimg,usercontroller.savegardner);
route.post('/gardner/login',usercontroller.logingardner);

route.post('/adminlogin',admincontroller.loginvalidateadmin);

route.post('/regorg',orgcontroller.uploadimg,orgcontroller.saveorg);
route.post('/orglogin',orgcontroller.loginvalidateorg);


module.exports=route;