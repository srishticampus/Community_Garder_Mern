import React from 'react';
import CommunitySidebar from './CommunitySideBar';
import DashboardContent from './DashboardContent';

function CommunityDashboard() {
  return (
    <div className="admin-dashboard d-flex">
      <CommunitySidebar />
      <DashboardContent/>
    </div>
  );
}

export default CommunityDashboard;
