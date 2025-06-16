import React from 'react';
import CommunitySidebar from './CommunityViewGardeners';
import DashboardContent from './DashboardContent';
import CommunityResourceNav from './CommunityResourceNav';

function CommunityDashboard() {
  return (
    <div className="admin-dashboard d-flex">
      <CommunityResourceNav />
      <DashboardContent/>
    </div>
  );
}

export default CommunityDashboard;
