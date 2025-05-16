var gardner = require("../Models/gardnerSchema");
var bcrypt = require("bcrypt")
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadimg = multer({ storage: storage }).single("profilePic");

const savegardner = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    console.log(req.body);

    const profilePic = req.file;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    const existinggardner = await gardner.findOne({ emailId: req.body.emailId });
    if (existinggardner) {
      return res.json({ message: "Email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newGardner = new gardner({
      fullName: req.body.fullName,
      gender: req.body.gender,
      profilePic: {
        filename: profilePic.filename,
        path: profilePic.path,
        mimetype: profilePic.mimetype,
        size: profilePic.size,
      },
      mobileNo: req.body.mobileNo,
      emailId: req.body.emailId,
      district: req.body.district,
      city: req.body.city,
      pincode: req.body.pincode,
      password: hashedPassword,
      // Remove confirmPass from DB, it's only for verification
      yearofexperience: req.body.yearofexperience,
      availabletime: req.body.availabletime,
      preferedcrops: req.body.preferedcrops,
      skills: req.body.skills,

    });

    const result = await newGardner.save();

    res.status(200).json({
      success: true,
      message: "Registered successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error while registering gardner:", error);
    res.status(500).json({
      message: "Error registering gardner",
      error: error.message,
    });
  }
};

const logingardner = async (req, res) => {

  try {
    const { emailId, password } = req.body;

    // Check if email exists
    const existingUser = await gardner.findOne({ emailId });
    if (!existingUser) {
      return res.json({ message: "User not found" });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return res.json({ message: "Invalid password" });
    }

    // Successful login
    res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        fullName: existingUser.fullName,
        emailId: existingUser.emailId,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Something went wrong during login",
      error: error.message,
    });
  }
};

const viewAllGardners = async (req, res) => {
  try {
    const gardners = await gardner.find();
    res.status(200).json(gardners);
  } catch (error) {
    console.error("Error fetching gardners:", error);
    res.status(500).json({ message: "Error retrieving gardners", error: error.message });
  }
};

const viewGardnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const singleGardner = await gardner.findById(id);

    if (!singleGardner) {
      return res.status(404).json({ message: "Gardner not found" });
    }

    res.status(200).json(singleGardner);
  } catch (error) {
    console.error("Error fetching gardner:", error);
    res.status(500).json({ message: "Error retrieving gardner", error: error.message });
  }
};

const updateGardnerById = async (req, res) => {
  console.log(req.body);

  try {
    const { id } = req.params;
    const updateData = req.body;

    // If password is provided, hash it
    if (updateData.password) {
      if (updateData.password !== updateData.confirmPass) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // Handle profilePic if new image is uploaded
    if (req.file) {
      updateData.profilePic = {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
    }

    const updatedGardner = await gardner.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedGardner) {
      return res.status(404).json({ message: "Gardner not found" });
    }

    res.status(200).json({
      message: "Gardner updated successfully",
      data: updatedGardner,
    });
  } catch (error) {
    console.error("Error updating gardner:", error);
    res.status(500).json({ message: "Error updating gardner", error: error.message });
  }
};

const forgotGardnerPassword = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Check if user exists
    const existingUser = await gardner.findOne({ emailId });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    existingUser.password = hashedPassword;
    await existingUser.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Error updating password", error: error.message });
  }
};


  
const getAllPlots = async (req, res) => {
  try {
    const plots = await GardenPlot.find()
      .populate('gardenId')
      .populate('gardenerId');
    res.status(200).json({ success: true, data: plots });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get plot by ID
const getPlotById = async (req, res) => {
  try {
    const plot = await GardenPlot.findById(req.params.id)
      .populate('gardenId')
      .populate('gardenerId');
    if (!plot) {
      return res.status(404).json({ success: false, message: 'Plot not found' });
    }
    res.status(200).json({ success: true, data: plot });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new plot
const createPlot = async (req, res) => {
  try {
    const plot = await GardenPlot.create(req.body);
    res.status(201).json({ success: true, data: plot });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update plot
const updatePlot = async (req, res) => {
  try {
    const plot = await GardenPlot.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!plot) {
      return res.status(404).json({ success: false, message: 'Plot not found' });
    }
    res.status(200).json({ success: true, data: plot });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete plot
const deletePlot = async (req, res) => {
  try {
    const plot = await GardenPlot.findByIdAndDelete(req.params.id);
    if (!plot) {
      return res.status(404).json({ success: false, message: 'Plot not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  savegardner,
  uploadimg,
  logingardner,
  viewAllGardners,
  viewGardnerById,
  updateGardnerById, forgotGardnerPassword
  , forgotGardnerPassword, getAllPlots,
  getPlotById,
  createPlot,
  updatePlot,
  deletePlot
};

  
