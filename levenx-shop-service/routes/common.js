const common = [
    {
        path: "/upload",
        method: "post",
        service: "CommonService.upload"
    },
    {
        path: "/search",
        service: "CommonService.search"
    },
    {
        path: "/my",
        service: "CommonService.my"
    }
]

module.exports = common;
