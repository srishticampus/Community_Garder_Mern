var gardner = require("../Models/gardnerSchema");

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
  try {
    console.log(req.body);

    const profilePic = req.file;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    if (req.body.password !== req.body.confirmPass) {
      return res.status(400).json({ message: "Passwords do not match" });
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
    });

    const result = await newGardner.save();

    res.status(200).json({
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
        return res.status(404).json({ message: "User not found" });
      }
  
      // Compare password
      const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
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
  
  module.exports = {
    savegardner,
    uploadimg,
    logingardner,
    viewAllGardners,
    viewGardnerById,
    updateGardnerById,
  };
  