import React from 'react';
import AdminSidebar from './AdminSidebar';
import DashboardContent from './DashboardContent';

function AdminHomePage() {
  return (
    <div className="admin-dashboard d-flex">
      <AdminSidebar />
      <DashboardContent/>
    </div>
  );
}

export default AdminHomePage;
