const classify = [
    {
        path: "/add",
        method: 'post',
        service: "ClassifyService.create"
    },
    {
        path: "/search",
        method: 'post',
        service: "ClassifyService.search"
    },
    {
        path: "/all",
        service: "ClassifyService.all",
        unAuth: true
    },
    {
        path: "/goods/relation/:id",
        service: "ClassifyService.relationSearch"
    },
    {
        path: "/goods/add",
        method: 'post',
        service: "ClassifyService.relationAdd"
    },
    {
        path: "/del/:id",
        service: "ClassifyService.del"
    }
]

module.exports = classify;