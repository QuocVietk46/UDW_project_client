import { useAlertStore } from "@/stores/alertStore";

export function useException(error) {
  console.log({ error });
  switch (error.response.data.message) {
    case "Out of stock":
      Alert("Chỉ còn " + error.response.data.quantity + " sản phẩm");
      break;
    case "Out limit quantity":
      Alert("Số lượng sản phẩm vượt quá 10");
      break;
    case "Please fill all required fields":
      Alert("Vui lòng điền đầy đủ thông tin");
      break;
    case "User already exists":
      Alert("Email đã được sử dụng");
      break;
    case "User not found":
      Alert("Email không tồn tại");
      break;
    case "Password is incorrect":
      Alert("Mật khẩu không chính xác");
      break;
    default:
      Alert("Có lỗi xảy ra");
      break;
  }
}

function Alert(message) {
  console.log({ message });
  const alertStore = useAlertStore();
  alertStore.setAlert({
    message,
    type: "error",
  });
}
