const Koa    = require("koa");
const config = require("./config").static;
const app  = new Koa();

const static  = require("./koa/static");
const redis   = require("./koa/redis");
app.use(redis({
    host : "10.85.114.151",
    port : 6380
}));
app.use(async (ctx, next) => {
    for(var i =0;i<1000;i++){
         ctx.redis.incr("incr3");
    }
    console.log(await ctx.redis.get("incr3"))
    await next();
});
app.use(static());
app.listen(config.port);
console.log('start');