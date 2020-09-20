const order = [
    {
        path: "/",
        method: "post",
        service: "OrderService.doOrder"
    },
    {
        path: "/pay",
        method: "post",
        service: "OrderService.doPay"
    },
    {
        path: "/ensure",
        method: "post",
        service: "OrderService.ensure"
    },
    {
        path: "/list",
        method: "post",
        service: "OrderService.list"
    },
    {
        path: "/admin/list",
        method: "post",
        service: "OrderService.adminList"
    },
    {
        path: "/del/:id",
        service: "OrderService.adminDel"
    }
]

module.exports = order;
