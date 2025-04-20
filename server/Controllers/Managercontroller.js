var managers = require("../models/ManagerSchema");
var bcrypt = require("bcrypt");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadManagerImg = multer({ storage: storage }).single("profilePic");

// Register Manager
const saveManager = async (req, res) => {
  try {
    const profilePic = req.file;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Check if email already exists
    const existingManager = await managers.findOne({ emailId: req.body.emailId });
    if (existingManager) {
      return res.json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newManager = new managers({
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
      yearofexperience: req.body.yearofexperience,
    });

    const result = await newManager.save();

    res.status(200).json({
      success: true,
      message: "Manager registered successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error registering manager:", error);
    res.status(500).json({
      success: false,
      message: "Error registering manager",
      error: error.message,
    });
  }
};


// Login Manager
const loginManager = async (req, res) => {
  console.log(req.body);
  
  try {
    const emailId=req.body.email
    const password=req.body.password
 
    const existingUser = await managers.findOne({ emailId });
    if (!existingUser) {
      return res.json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return res.json({ message: "Invalid password" });
    }

    res.status(200).json({
      success:true,
      message: "Login successful",
      user: {
        id: existingUser._id,
        fullName: existingUser.fullName,
        emailId: existingUser.emailId,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong during login", error: error.message });
  }
};

// View All Managers
const viewAllManagers = async (req, res) => {
  try {
    const result = await managers.find();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching managers:", error);
    res.status(500).json({ message: "Error retrieving managers", error: error.message });
  }
};

// View Manager By ID
const viewManagerById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await managers.findById(id);

    if (!result) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching manager:", error);
    res.status(500).json({ message: "Error retrieving manager", error: error.message });
  }
};

// Update Manager By ID
const updateManagerById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    if (req.file) {
      updateData.profilePic = {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
    }

    const updated = await managers.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.json({ message: "Manager not found" });
    }

    res.status(200).json({
      success:true,
      message: "Manager updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating manager:", error);
    res.status(500).json({ message: "Error updating manager", error: error.message });
  }
};

// Forgot Password
const forgotManagerPassword = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await managers.findOne({ emailId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Error updating password", error: error.message });
  }
};

module.exports = {
  saveManager,
  uploadManagerImg,
  loginManager,
  viewAllManagers,
  viewManagerById,
  updateManagerById,
  forgotManagerPassword,
};
