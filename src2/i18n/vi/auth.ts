export const auth = {
  login: {
    title: 'Đăng nhập',
    phoneLoginGuideText: 'Hãy nhập Số điện thoại để tiếp tục',
    otherOptionsLoginText: 'Hoặc đăng nhập bằng',
    forgotPasswordText: 'Quên mật khẩu?',
    version: 'Phiên bản ứng dụng v{{ version }}',
    registerGuideText: 'Chưa có tài khoản?',
    placeholder: {
      phoneOrEmailLoginText: 'Nhập số điện thoại hoặc email',
      passwordText: 'Nhập mật khẩu',
    },
    error: {
      phoneOrEmailIncorrectFormat: 'Số điện thoại hoặc email chưa đúng định dạng',
    },
    remember: 'Ghi nhớ',
    login: 'Đăng nhập',
  },
  authOption: {
    email: 'Tài khoản Email',
    google: 'Tài khoản Google',
    facebook: 'Tài khoản Facebook',
    apple: 'Tài khoản Apple',
    phone: 'Số điện thoại',
  },
  register: {
    title: 'Đăng ký',
    otherOptionsRegisterText: 'Hoặc đăng ký bằng',
    placeholder: {
      phone: 'Số điện thoại (bắt buộc)',
      email: 'Nhập email (không bắt buộc)',
    },
  },
  errorMessage: {
    invalidPhoneFormat: 'Số điện thoại chưa đúng định dạng',
    phoneInUsed: 'Số điện thoại đã được sử dụng',
    invalidEmailFormat: 'Email chưa đúng định dạng',
    emailInUsed: 'Email đã tồn tại. Vui lòng nhập lại',
    bothPhoneAndEmailInUsed: 'Số điện thoại và Email đã tồn tại',
  },
  verifyOtp: {
    message: 'Mã xác nhận gồm 6 chữ số đã được gửi tới số điện thoại <bold>{{ phone }}</bold>',
    otpError: 'Mã xác thực không đúng. Bạn còn {{ count }} lần để nhập',
    resend: 'Gửi lại mã sau <primary>{{ countdown }}<primary>',
    resendAction: 'Gửi lại mã',
  },
};
