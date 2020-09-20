const shopcar = [
    {
        path: "/create",
        method: "post",
        service: "ShopCarService.create"
    },
    {
        path: "/alter",
        method: "post",
        service: "ShopCarService.alter"
    },
    {
        path: "/search",
        service: "ShopCarService.search"
    },
    {
        path: "/count",
        service: "ShopCarService.count"
    },
    {
        path: "/del/:id",
        method: "del",
        service: "ShopCarService.del"
    }
]

module.exports = shopcar;
