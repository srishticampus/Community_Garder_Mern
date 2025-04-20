const Organization = require("../Models/Organizationschema");
const multer = require("multer");
const bcrypt = require("bcrypt");

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadimg = multer({ storage: storage }).single("photo");

// Register Organization
const saveorg = async (req, res) => {
  try {
    const {
      organizationName,
      organizationtype,
      emailId,
      address,
      phoneNo,
      password,
      confirmPass,
    } = req.body;
    const photo = req.file;

    // Check for required photo
    if (!photo) {
      return res.status(400).json({ message: "Organization photo is required" });
    }

    // Password match check
    if (password !== confirmPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 🔍 Check if email already exists
    const existingOrg = await Organization.findOne({ emailId });
    if (existingOrg) {
      return res.status(409).json({
        message: "Email already exists. Please use a different email.",
      });
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save organization
    const org = new Organization({
      organizationName,
      organizationtype,
      emailId,
      photo: {
        filename: photo.filename,
        path: photo.path,
        mimetype: photo.mimetype,
        size: photo.size,
      },
      address,
      phoneNo,
      password: hashedPassword,
      confirmPass,
    });

    const result = await org.save();

    res.status(200).json({
      message: "Registered successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error while registering organization:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};


// Login Organization
const loginvalidateorg = async (req, res) => {
  console.log(req.body);

  try {
    const emailId = req.body.email
    const password = req.body.password

    const existingOrg = await Organization.findOne({ emailId });

    if (!existingOrg) {
      return res.json({ message: "Organization not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingOrg.password
    );
    if (!isPasswordValid) {
      return res.json({ message: "Invalid password" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: existingOrg._id,
        organizationName: existingOrg.organizationName,
        emailId: existingOrg.emailId,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// ✅ View all organizations
const updateOrganizationById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = { ...req.body };

    // 🔒 Handle password update
    if (updatedData.password || updatedData.confirmPass) {
      if (updatedData.password !== updatedData.confirmPass) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const hashedPassword = await bcrypt.hash(updatedData.password, 10);
      updatedData.password = hashedPassword;
      updatedData.confirmPass = hashedPassword; // storing hashed confirmPass to match schema
    }

    // 🖼️ Handle photo update if file uploaded (with Multer)
    if (req.file) {
      updatedData.photo = {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
    }

    const updatedOrganization = await Organization.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrganization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json({
      message: "Organization updated successfully",
      data: updatedOrganization,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating organization",
      error: error.message,
    });
  }
};

const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json({ message: "Organizations fetched successfully", data: organizations });
  } catch (error) {
    res.status(500).json({ message: "Error fetching organizations", error: error.message });
  }
};

// ✅ Get one organization by ID
const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Organization.findById(id);

    if (!result) {
      return res.status(404).json({ message: "community not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching manager:", error);
    res.status(500).json({ message: "Error retrieving manager", error: error.message });
  }

};

const forgotOrganizationPassword = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await Organization.findOne({ emailId });
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
  saveorg,
  uploadimg,
  loginvalidateorg,
  getAllOrganizations,
  getOrganizationById,
  updateOrganizationById,
  forgotOrganizationPassword
};
