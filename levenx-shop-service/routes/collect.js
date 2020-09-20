const collect = [
    {
        path: "/:id",
        service: "CollectService.isStart"
    },
    {
        path: "/star",
        method: "post",
        service: "CollectService.start"
    },
    {
        path: "/list",
        method: "post",
        service: "CollectService.list"
    }
]

module.exports = collect;
