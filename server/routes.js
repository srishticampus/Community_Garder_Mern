var express = require("express");
var gardnercontroller = require("./Controllers/gardnercontroller");
var admincontroller = require("./Controllers/Admincontroller");
var organizationcontroller = require("./controllers/Organizationcontroller");
var managerController = require("./controllers/Managercontroller")
const gardenPlotController = require('./controllers/ploatcontroller');
const taskController = require("./controllers/taskcontroller")
const resourceController = require('./controllers/Resoursecontroller');
const eventcontroller = require("./controllers/eventcontroller")
const chatController = require("./controllers/MessageController");

var route = express.Router();

route.post('/gardner/register', gardnercontroller.uploadimg, gardnercontroller.savegardner);
route.post('/gardner/login', gardnercontroller.logingardner);
route.post("/gardner/forgotpassword", gardnercontroller.forgotGardnerPassword);
route.post('/gardner/viewone/:id', gardnercontroller.viewGardnerById);
route.post("/gardner/profileupdate/:id", gardnercontroller.updateGardnerById);
route.post("/gardner/viewallgardner", gardnercontroller.viewAllGardners);

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

// ploat
route.post('/createploat', gardenPlotController.uploadimg, gardenPlotController.createGardenPlot);
route.put('/assignGardeners/:plotId', gardenPlotController.assignGardenersToPlot);
route.get('/view/assignGardeners/:plotId', gardenPlotController.ViewassignGardenersToPlot);
route.get('/manager/:managerId', gardenPlotController.getAllGardenPlotsByManager);
route.get('/gardener/:gardenerId', gardenPlotController.getGardenPlotsByGardener);
route.put("/manager/edit/:plotId", gardenPlotController.uploadimg, gardenPlotController.updateGardenPlot);
route.delete("/manager/delete/:plotId", gardenPlotController.deleteGardenPlot);
route.get("/plot/viewallgarden", gardenPlotController.ViewallGardenPlot);
// task
route.post("/createtask", taskController.createTask);
route.get("/task/gardener/:gardenerId", taskController.getTasksByGardener);
route.put("/task/status/:taskId", taskController.updateTaskStatus);
route.put("/task/edit/:taskId", taskController.editTask);
route.delete("/task/delete/:taskId", taskController.deleteTask);
route.get("/task/manager/:managerId", taskController.getTasksByManager);
route.get("/viewa/task/:taskId", taskController.getSingleTask);

// resourse
route.post('/resource/add', resourceController.uploadimg, resourceController.addResource);
route.get('/resource/all', resourceController.uploadimg, resourceController.viewAllResources);
route.get('/resource/:id', resourceController.viewOneResource);
route.delete('/resource/delete/:id', resourceController.deleteResource);
route.put('/resource/update/:id', resourceController.uploadimg, resourceController.updateResource);

// event
route.post("/addevent",eventcontroller.uploadimg, eventcontroller.addEvent);
route.get("/event/upcoming", eventcontroller.viewUpcomingEvents);
route.get("/event/manager/:managerId", eventcontroller.viewEventsByManager);
route.post("/event/register/:eventId", eventcontroller.registerEventByGardener);
route.put("/event/edit/:eventId", eventcontroller.editEvent);
route.post("/event/delete/:eventId", eventcontroller.deleteEvent);

route.post("/message/send", chatController.sendMessage);
route.get("/getmessage/:plotId", chatController.getPlotChat);

module.exports = route;