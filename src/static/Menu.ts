import { FrameTypes } from "@/enum/enum";

export const mainMenuItem = [
  {
    title: "Dashboard",
    path: "/",
  },
  {
    title: "Publish",
    path: "/publish",
  },
  // {
  //   title: "Create",
  //   path: "/create",
  // },
  {
    title: "Analyze",
    path: "/analyze",
  },
  {
    title: "Engagement",
    path: "/engagement",
  },
  {
    title: "Team Board",
    path: "/board",
  },
  {
    title: "Settings",
    path: "/settings",
  },
  // {
  //   title: "Products",
  //   path: "products",
  // },
  // {
  //   title: "Purchase",
  //   path: "purchase",
  // },
  // {
  //   title: "Participants",
  //   path: "participants",
  // },
  // {
  //   title: "Orders",
  //   path: "orders",
  // },
  // {
  //   title: "Accounts",
  //   path: "/accounts",
  // },
  // {
  //   title: "Reports & Analytics",
  //   path: "/reports",
  // },
  // {
  //   title: "Settings",
  //   path: "settings",
  // },
];

export const participantMenuItem = [
  {
    title: "Customer",
    path: "customers",
  },
  {
    title: "Vendor",
    path: "vendors",
  },
];

export const productMenuItem = [
  {
    title: "Frame",
    path: `glasses/${FrameTypes.FRAME}`,
  },
  {
    title: "RM Glasses",
    path: `glasses/${FrameTypes.READYMADEGLASSES}`,
  },
  {
    title: "Sun Glasses",
    path: `glasses/${FrameTypes.SUNGLASSES}`,
  },
  {
    title: "Kit",
    path: "kit",
  },
  {
    title: "Lense",
    path: "lense",
  },
  {
    title: "Glass",
    path: "glass",
  },
  {
    title: "Accessories",
    path: "accessories",
  },
  {
    title: "General",
    path: "general",
  },
  {
    title: "Category",
    path: "category",
  },
];
