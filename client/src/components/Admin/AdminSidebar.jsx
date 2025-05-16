import React from "react";
import { FaUsers, FaUserTie, FaBox, FaHome, FaLeaf } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import { GoOrganization } from "react-icons/go";
import { TbGardenCart } from "react-icons/tb";
import { MdManageAccounts } from "react-icons/md";
import { Button } from "react-bootstrap";
import "../../assets/css/CommunityDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaChevronDown,
  FaSeedling,
  FaCalendarAlt,
  FaTools,
} from "react-icons/fa";

function AdminSidebar() {
  const nav = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("adminId");
    nav("/admin/Login");
  };
  return (
    <div
      className="p-3 vh-100 d-flex flex-column justify-content-between"
      style={{
        minWidth: "320px",
        backgroundColor: "#198754",
        color: "white",
      }}
    >
      <div>
        <div className="d-flex align-items-center mb-4">
          <FaHome size={20} className="me-2 text-white" />
          <span className="fw-bold fs-5 text-white">Community Garden</span>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <span className="nav-link active text-white d-flex align-items-center">
              <Link
                className="text-decoration-none text-light"
                to="/admin/dashboard"
              >
                <FaHome className="me-2" /> Dashboard
              </Link>
            </span>
          </li>
          <li className="nav-item mb-2">
            <span className="nav-link active text-white d-flex align-items-center">
              <Link className="text-decoration-none text-light" to="/admin/view/gardeners">
                {" "}
                <FaUsers className="me-2" />
                Gardeners{" "}
              </Link>
            </span>
          </li>
          <li className="nav-item mb-2">
            <span className="nav-link active text-white d-flex align-items-center">
              <Link className="text-decoration-none text-light" to="/admin/view/managers">
                {" "}
                <MdManageAccounts className="me-2" />
                Managers{" "}
              </Link>
            </span>
          </li>
          <li className="nav-item mb-2">
            <span className="nav-link active text-white d-flex align-items-center">
              <Link className="text-decoration-none text-light" to="/admin/view/garden">
                {" "}
                <FaLeaf  className="me-2" />
                Garden{" "}
              </Link>
            </span>
          </li>
          <li className="nav-item mb-2">
            <span className="nav-link active text-white d-flex align-items-center">
              <Link className="text-decoration-none text-light" to="/admin/view/organization">
                {" "}
                <GoOrganization  className="me-2" />
                Organization{" "}
              </Link>
            </span>
          </li>
          <li className="nav-item mb-2">
            <span className="nav-link active text-white d-flex align-items-center">
              <Link className="text-decoration-none text-light" to="/admin/view/resource">
                {" "}
                <FaTools className="me-2" />
                Resource{" "}
              </Link>
            </span>
          </li>
          {/* <li className="nav-item mb-2">
            <span className="nav-link active text-white d-flex align-items-center">
              <Link  className='text-decoration-none text-light' to="/community/profile"><FaUserTie className="me-2" /> Profile</Link>
            </span>
          </li> */}
          {/* <li className="nav-item mb-2">
            <Button
              style={{ backgroundColor: '#28a745', border: 'none' }}
              className="w-100 d-flex align-items-center"
            >
              <FaBox className="me-2" /> Add Package
            </Button>
          </li>
          <li className="nav-item mb-2">
            <Button
              variant="light"
              className="w-100 d-flex align-items-center text-success"
            >
              <FaBox className="me-2" /> View Packages
            </Button>
          </li>
          <li className="nav-item mb-2">
            <span className="nav-link text-white d-flex align-items-center">
              <FaUsers className="me-2" /> View Orders
            </span>
          </li>
          <li className="nav-item mb-2">
            <span className="nav-link text-white d-flex align-items-center">
              <FaUserTie className="me-2" /> Add New Staff
            </span>
          </li> */}
        </ul>
      </div>
      <Button
        variant="light"
        onClick={handlelogout}
        className="text-success fw-bold"
      >
        LOGOUT
      </Button>
    </div>
  );
}

export default AdminSidebar;
