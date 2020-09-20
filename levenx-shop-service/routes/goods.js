const goods = [
    {
        path: "/admin/search",
        method: "post",
        service: "GoodsService.adminSearch"
    },
    {
        path: "/admin/all",
        service: "GoodsService.adminAll"
    },
    {
        path: "/admin/del/:id",
        service: "GoodsService.adminDel"
    },
    {
        path: "/waterfalls",
        method: "post",
        service: "GoodsService.waterfalls",
        unAuth: true
    },
    {
        path: "/create",
        method: "post",
        service: "GoodsService.create"
    },
    {
        path: "/detail/:id",
        service: "DetailService.detail"
    }
]

module.exports = goods;
