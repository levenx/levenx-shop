// 核心类
const requireDir = require("require-dir");
const routes = requireDir("./routes");
const services = requireDir("./services");
const Router = require("koa-router");
const { appPrefix } = require("./config");
const unAuths = [];

//过滤出不需要鉴权的路由
for (let [name, routers] of Object.entries(routes)) {
  for (let { path, unAuth } of routers) {
    if (unAuth) {
      unAuths.push(`${appPrefix}/${name}${path !== "/" ? path : ""}`);
    }
  }
}

//处理路由
function RouteProcess(app) {
  for (let [name, routers] of Object.entries(routes)) {
    const router = new Router({ prefix: `${appPrefix}/${name}` });
    for (let { path, method = "get", service, control } of routers) {
      let serviceFn = service.split(".").reduce((fn, serv, index, arr) => {
        return fn && fn[serv];
      }, services);
      //方法未定义警告
      if (!serviceFn) {
        console.warn(
          `path:${path} =>method:${method} =>service:${service}未定义！！！`
        );
        serviceFn = ServiceMiss;
      }
      router[method.toLowerCase()](path, async (ctx, next) => {
        //权限校验
        const { userIds, roles, auths } = control || {};
        const { userId, roles: curRoles = [], auths: curAuths = [] } =
          ctx.control || {};
        if (userIds) {
          let userInx = userIds.indexOf(userId);
          if (userInx === -1) {
            ctx.body = {
              code: 403,
            };
          }
        }
        if (roles) {
          const crossRoles = roles.filter(function (r) {
            return curRoles.indexOf(r) > -1;
          });
          if (!crossRoles.length) {
            ctx.body = {
              code: 403,
            };
          }
        }
        if (auths) {
          const crossAuths = auths.filter(function (a) {
            return curAuths.indexOf(a) > -1;
          });
          if (!crossAuths.length) {
            ctx.body = {
              code: 403,
            };
          }
        }
        if (ctx.body && ctx.body.code === 403) {
          return;
        }
        const result = await serviceFn(ctx, next);
        ctx.body = result;
      });
    }
    console.log("route:", router.opts.prefix);
    app.use(router.routes(), router.allowedMethods());
  }
}

function AuthCheck() { }

//默认的路由中间件
function ServiceMiss(ctx, next) {
  return { code: 404, message: "undefine" };
}

module.exports = { RouteProcess, unAuths };
