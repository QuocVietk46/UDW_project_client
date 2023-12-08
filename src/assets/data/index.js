export const category = [
  { value: "t-shirt", title: "Áo thun" },
  { value: "shirts", title: "Áo sơ mi" },
  { value: "short", title: "Quần short" },
  { value: "pant", title: "Quần dài" },
  { value: "jeans", title: "Quần jean" },
  { value: "jacket", title: "Áo khoác" },
];
export const listNav = [
  {
    title: "Toàn bộ",
    to: "Products",
  },
  {
    title: "Áo sơ mi",
    to: "Products",
    query: { category: "shirts" },
  },
  {
    title: "Áo thun",
    to: "Products",
    query: { category: "t-shirt" },
  },
  {
    title: "Quần short",
    to: "Products",
    query: { category: "short" },
  },
  {
    title: "Quần dài",
    to: "Products",
    query: { category: "pant" },
  },
  {
    title: "Quần jean",
    to: "Products",
    query: { category: "jeans" },
  },
  {
    title: "Áo khoác",
    to: "Products",
    query: { category: "jacket" },
  },
];

export const status = [
  { value: "draft", title: "Nháp" },
  { value: "available", title: "Có sẵn" },
  { value: "unavailable", title: "Hết hàng" },
  { value: "stop", title: "Ngừng bán" },
];

export const role = ["admin", "user"];

export const rate = [1, 2, 3, 4, 5];

export const orderStatus = [
  { value: "all", title: "Tất cả" },
  { value: "pending", title: "Chờ xử lý" },
  { value: "shipping", title: "Đang giao" },
  { value: "delivered", title: "Đã giao" },
  { value: "cancel", title: "Đã hủy" },
];

export const bankcode = [
  {
    value: "VNPAYQR",
    title: "VNPAYQR",
  },
  {
    value: "IB",
    title: "Internet Banking",
  },
  {
    value: "SCB",
    title: "Ngân hàng SCB",
  },
  {
    value: "NCB",
    title: "Ngân hàng NCB",
  },
  {
    value: "EXIMBANK",
    title: "Ngân hàng EXIMBANK",
  },
  {
    value: "SACOMBANK",
    title: "Ngân hàng SACOMBANK",
  },
];

export const banners = [
  {
    path: "images/banner1.png",
    name: "banner1.png",
  },
  {
    path: "images/banner2.png",
    name: "banner2.png",
  },
  {
    path: "images/banner3.png",
    name: "banner1.png",
  },
];

export const months = [
  {
    title: "Tháng 1",
    value: 1,
  },
  {
    title: "Tháng 2",
    value: 2,
  },
  {
    title: "Tháng 3",
    value: 3,
  },
  {
    title: "Tháng 4",
    value: 4,
  },
  {
    title: "Tháng 5",
    value: 5,
  },
  {
    title: "Tháng 6",
    value: 6,
  },
  {
    title: "Tháng 7",
    value: 7,
  },
  {
    title: "Tháng 8",
    value: 8,
  },
  {
    title: "Tháng 9",
    value: 9,
  },
  {
    title: "Tháng 10",
    value: 10,
  },
  {
    title: "Tháng 11",
    value: 11,
  },
  {
    title: "Tháng 12",
    value: 12,
  },
];
export const years = [2020, 2021, 2022, 2023, 2024, 2025];
