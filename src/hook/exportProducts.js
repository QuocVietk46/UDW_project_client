import { utils, writeFile } from "xlsx";

export const exportProducts = (products) => {
  // Create workbook and worksheet
  const wb = utils.book_new();
  const ws = utils.json_to_sheet(products);

  // Add worksheet to workbook
  utils.book_append_sheet(wb, ws, "Danh sách sản phẩm");

  // Export workbook as .xlsx file
  writeFile(wb, "ds_sp.xlsx");
};
