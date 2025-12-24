export const loginData = [
    {
        name: "TC1-Đăng nhập thành công",
        username: "practice",
        password: "SuperSecretPassword!",
        message: "You logged into a secure area!",
        url: "/secure",
        success: true
    },
    {
        name: "TC2-Sai tên đăng nhập",
        username: "wrongUser",
        password: "WrongPassword",
        message: "Your username is invalid!",
        url: "/login",
        success: false
    },
    {
        name: "TC3-Sai mật khẩu",
        username: "practice",
        password: "WrongPassword",
        message: "Your password is invalid!",
        url: "/login",
        success: false
    }
]