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

    if (!photo) {
      return res
        .status(400)
        .json({ message: "Organization photo is required" });
    }

    if (password !== confirmPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

// Login Organization
const loginvalidateorg = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const existingOrg = await Organization.findOne({ emailId });

    if (!existingOrg) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingOrg.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
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
const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching organizations", error: error.message });
  }
};

// ✅ View one organization by ID
const getOrganizationById = async (req, res) => {
  try {
    const id = req.params.id;
    const organization = await Organization.findById(id);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(organization);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching organization", error: error.message });
  }
};

// ✅ Update organization by ID
const updateOrganizationById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    if (updatedData.password || updatedData.confirmPass) {
      if (updatedData.password !== updatedData.confirmPass) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    // Handle photo update if new file is uploaded
    if (req.file) {
      updatedData.photo = {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
    }

    const result = await Organization.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json({
      message: "Organization updated successfully",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating organization", error: error.message });
  }
};

module.exports = {
  saveorg,
  uploadimg,
  loginvalidateorg,
  getAllOrganizations,
  getOrganizationById,
  updateOrganizationById,
};
