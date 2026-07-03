// data/dummyOffers.js

export const dummyOffers = [
  {
    _id: "6a475dc778a52ed4b7477f49",
    title: "SUMMER30",
    description: "Min order ₹2,000 · Percentage",

    startDate: "2026-07-03T00:00:00.000Z",
    endDate: "2026-07-30T23:59:59.000Z",

    status: true,

    createdAt: "2026-07-03T06:59:19.914Z",
    updatedAt: "2026-07-03T06:59:19.914Z",

    // Future Ready
    discountType: "Percentage",
    discountValue: 30,
    minimumOrder: 2000,
    couponCode: "SUMMER30",
    usageLimit: 100,
    usedCount: 28,
  },

  {
    _id: "6a475d7e78a52ed4b7477f48",
    title: "NEWMEMBER",
    description: "Min order ₹1,499 · Flat",

    startDate: "2026-07-03T00:00:00.000Z",
    endDate: "2026-07-31T23:59:59.000Z",

    status: true,

    createdAt: "2026-07-03T06:58:06.845Z",
    updatedAt: "2026-07-03T06:58:06.845Z",

    // Future Ready
    discountType: "Flat",
    discountValue: 500,
    minimumOrder: 1499,
    couponCode: "NEWMEMBER",
    usageLimit: 50,
    usedCount: 12,
  },

  {
    _id: "6a47619178a52ed4b7477f4b",
    title: "FESTIVE50",
    description: "Flat ₹500 Off on ₹3,000 Purchase",

    startDate: "2026-07-10T00:00:00.000Z",
    endDate: "2026-08-05T23:59:59.000Z",

    status: true,

    createdAt: "2026-07-03T07:15:29.194Z",
    updatedAt: "2026-07-03T07:15:29.194Z",

    discountType: "Flat",
    discountValue: 500,
    minimumOrder: 3000,
    couponCode: "FESTIVE50",
    usageLimit: 150,
    usedCount: 42,
  },

  {
    _id: "6a4761ff78a52ed4b7477f4c",
    title: "WELCOME20",
    description: "20% Off for First Purchase",

    startDate: "2026-07-01T00:00:00.000Z",
    endDate: "2026-07-25T23:59:59.000Z",

    status: true,

    createdAt: "2026-07-03T08:10:11.111Z",
    updatedAt: "2026-07-03T08:10:11.111Z",

    discountType: "Percentage",
    discountValue: 20,
    minimumOrder: 999,
    couponCode: "WELCOME20",
    usageLimit: 300,
    usedCount: 126,
  },

  {
    _id: "6a47629978a52ed4b7477f4d",
    title: "FLASHSALE",
    description: "Limited Time Flat ₹300 Off",

    startDate: "2026-06-15T00:00:00.000Z",
    endDate: "2026-06-25T23:59:59.000Z",

    status: false,

    createdAt: "2026-06-14T10:00:00.000Z",
    updatedAt: "2026-06-25T10:00:00.000Z",

    discountType: "Flat",
    discountValue: 300,
    minimumOrder: 1200,
    couponCode: "FLASHSALE",
    usageLimit: 80,
    usedCount: 80,
  },

  {
    _id: "6a47632278a52ed4b7477f4e",
    title: "INDEPENDENCE25",
    description: "25% Off on All Memberships",

    startDate: "2026-08-10T00:00:00.000Z",
    endDate: "2026-08-20T23:59:59.000Z",

    status: true,

    createdAt: "2026-07-03T09:00:00.000Z",
    updatedAt: "2026-07-03T09:00:00.000Z",

    discountType: "Percentage",
    discountValue: 25,
    minimumOrder: 0,
    couponCode: "IND25",
    usageLimit: 500,
    usedCount: 0,
  },
];

// ========================================
// Dashboard Summary
// ========================================

export const offerSummary = {
  totalOffers: dummyOffers.length,

  activeOffers: dummyOffers.filter(
    (offer) =>
      offer.status &&
      new Date(offer.endDate) >= new Date()
  ).length,

  expiredOffers: dummyOffers.filter(
    (offer) =>
      new Date(offer.endDate) < new Date()
  ).length,

  upcomingOffers: dummyOffers.filter(
    (offer) =>
      new Date(offer.startDate) > new Date()
  ).length,
};