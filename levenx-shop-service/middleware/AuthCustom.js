const AuthHandler = () => async function (ctx, next) {
    return next().catch(err => {
        if (err.status === 401) {
            ctx.body = {
                status: 401
            }
        } else {
            throw err;
        }
    })
}

module.exports = { AuthHandler };