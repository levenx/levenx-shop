const login = [
    {
        path: "/sign",
        method: 'post',
        service: "LoginService.sign",
        unAuth: true
    },
    {
        path: "/qr",
        service: "LoginService.qr",
        unAuth: true
    },
    {
        path: "/doScan/:operate",
        method: 'post',
        service: "LoginService.scan",
    }
]

module.exports = login;
