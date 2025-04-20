var express = require("express");
var gardnercontroller = require("./Controllers/gardnercontroller");
var admincontroller = require("./Controllers/Admincontroller");
var organizationcontroller = require("./controllers/Organizationcontroller");
var managerController=require("./controllers/Managercontroller")
var route = express.Router();

route.post('/gardner/register', gardnercontroller.uploadimg, gardnercontroller.savegardner);
route.post('/gardner/login', gardnercontroller.logingardner);
route.post("/gardner/forgotpassword", gardnercontroller.forgotGardnerPassword);
route.post('/gardner/viewone/:id', gardnercontroller.viewGardnerById);
route.post("/gardner/profileupdate/:id", gardnercontroller.updateGardnerById);


route.post("/manager/register", managerController.uploadManagerImg, managerController.saveManager);
route.post("/manager/login", managerController.loginManager);
route.post("/manager/viewall", managerController.viewAllManagers);
route.post("/manager/viewone/:id", managerController.viewManagerById);
route.post("/manager/profileupdate/:id", managerController.uploadManagerImg, managerController.updateManagerById);
route.post("/manager/forgot-password", managerController.forgotManagerPassword);


route.post("/organization/register", organizationcontroller.uploadimg, organizationcontroller.saveorg);
route.post("/organization/login", organizationcontroller.loginvalidateorg);
route.post("/organization/viewall", organizationcontroller.getAllOrganizations);
route.post("/organization/viewone/:id", organizationcontroller.getOrganizationById);
route.post("/organization/profileedit/:id", organizationcontroller.uploadimg, organizationcontroller.updateOrganizationById);
route.post("/organization/forgot-password", organizationcontroller.forgotOrganizationPassword);

route.post('/adminlogin', admincontroller.loginvalidateadmin);



module.exports = route;