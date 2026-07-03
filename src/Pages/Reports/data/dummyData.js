// data/dummyData.js

// ==============================
// Revenue Report
// ==============================

export const revenueReport = {
  success: true,
  totalRevenue: 285750,

  // Future API
  monthlyRevenue: [
    { month: "Jan", revenue: 18000 },
    { month: "Feb", revenue: 22500 },
    { month: "Mar", revenue: 27400 },
    { month: "Apr", revenue: 33200 },
    { month: "May", revenue: 41800 },
    { month: "Jun", revenue: 50250 },
    { month: "Jul", revenue: 48500 },
    { month: "Aug", revenue: 44000 },
  ],
};

// ==============================
// Membership Report
// ==============================

export const membershipReport = {
  success: true,

  active: 86,
  expired: 14,

  // Future API
  pendingRenewal: 8,
  cancelled: 3,
};

// ==============================
// User Report
// ==============================

export const userReport = {
  success: true,

  totalUsers: 100,

  // Future API
  monthlyUsers: [
    { month: "Jan", users: 15 },
    { month: "Feb", users: 26 },
    { month: "Mar", users: 37 },
    { month: "Apr", users: 49 },
    { month: "May", users: 62 },
    { month: "Jun", users: 81 },
    { month: "Jul", users: 100 },
  ],
};

// ==============================
// Branch Report
// ==============================

export const branchReport = {
  success: true,

  report: [
    {
      branchName: "Bharat Fitness DEN",
      totalUsers: 42,
    },
    {
      branchName: "Bhubaneswar Branch",
      totalUsers: 26,
    },
    {
      branchName: "Cuttack Branch",
      totalUsers: 18,
    },
    {
      branchName: "Puri Branch",
      totalUsers: 14,
    },
  ],
};

// ==============================
// Dashboard Combined Data
// ==============================

export const reportData = {
  totalRevenue: revenueReport.totalRevenue,

  monthlyRevenue: revenueReport.monthlyRevenue,

  totalUsers: userReport.totalUsers,

  monthlyUsers: userReport.monthlyUsers,

  activeMembers: membershipReport.active,

  expiredMembers: membershipReport.expired,

  branches: branchReport.report,
};