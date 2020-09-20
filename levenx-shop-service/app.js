const Koa = require('koa')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser');
const koaBody = require('koa-body');
const logger = require('koa-logger')
const cors = require("koa-cors");
const { RouteProcess, unAuths } = require("./RouteProcess");
const { JwtCustom } = require("./middleware/JwtCustom");
const { AuthHandler } = require("./middleware/AuthCustom");
const { TimeCompute } = require("./middleware/TimeCompute");


const app = new Koa();

// 异常处理
onerror(app);

//上传附件中间件
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024	// 设置上传文件大小最大限制，默认2M
  }
}));

// middlewares
app.use(AuthHandler());
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(cors());
app.use(logger());
//Jwt 中间件
app.use(JwtCustom(unAuths));
// 接口请求时间
app.use(TimeCompute());

RouteProcess(app);


// 错误事件监听
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
