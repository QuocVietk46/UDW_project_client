import html2pdf from "html2pdf.js";

export const generatePDF = (order) => {
  const detailHTML = order.detail
    .map(
      (item) => `
        <tr>
          <td>${item.product.title}</td>
          <td>${item.quantity}</td>
          <td>${item.sale}%</td>
          <td>${item.price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}</td>
          <td>${(
            item.quantity *
            item.price *
            (1 - item.sale / 100)
          ).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}</td>
        </tr>
      `,
    )
    .join("");

  // Create HTML string dynamically from order data
  const htmlString = `
    <html>
      <head>
        <title>Hoá đơn</title>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          h1 {
            color: #333;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          h1 {
            text-align: center;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
          }
          h2 {
            font-size: 18px;
            font-weight: 600;
            margin-top: 20px;
          }
          .temp {
            color: #fff;
          }
        </style>
      </head>
      <body>
        <h1>Hoá đơn</h1>
        <p><strong>Mã đơn hàng: </strong> ${order._id}</p>
        <p><strong>Tên người nhận: </strong> ${order.full_name}</p>
        <p><strong>Địa chỉ: </strong> ${order.address}</p>
        <p><strong>Số điện thoại: </strong> ${order.phone}</p>
        <h2>Chi tiết đơn hàng</h2>
        <table>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giảm giá</th>
              <th>Đơn giá</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            ${detailHTML}
          </tbody>
        </table>
        <h2>Thông tin thanh toán</h2>
        <p style="margin-top: '10px'"><strong>Phương thức thanh toán:</strong> ${
          order.payment
        }</p>
        <p><strong>Phí vận chuyển:</strong> ${Number(30000).toLocaleString(
          "it-IT",
          {
            style: "currency",
            currency: "VND",
          },
        )}</p>
        <p><strong>Thuế GTGT:</strong> 10%</p>
        <p><strong>Tổng giá trị đơn hàng:</strong> ${order.price.toLocaleString(
          "it-IT",
          {
            style: "currency",
            currency: "VND",
          },
        )}</p>
        <p class="temp">xoa</p>
      </body>
    </html>
  `;

  // Convert HTML to PDF with adjusted margin values
  html2pdf(htmlString, {
    margin: 1, // Adjust the top and bottom margins as needed
    filename: `order_${order._id}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  });
};
