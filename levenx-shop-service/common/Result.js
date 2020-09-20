class Result {

    constructor(data, options) {
        let opt = options || {};
        this.code = opt.code || 0;
        this.message = opt.message || "OK";
        this.data = data;
    }


}

class PageResult extends Result {

    constructor(data, options) {
        super(data, options);
        this.pn = options.pn;
        this.ps = options.ps;
        this.count = options.count;
    }

}

module.exports = { Result, PageResult };