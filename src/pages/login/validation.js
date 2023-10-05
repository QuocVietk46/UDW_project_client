export const loginValidation = Yup.object().shape({
  account: Yup.string()
    .required('Vui lòng nhập email hoặc số điện thoại hợp lệ')
    .required('Email is required'),
  password: Yup.string()
    .required('Vui lòng nhập mât khẩu')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
});
