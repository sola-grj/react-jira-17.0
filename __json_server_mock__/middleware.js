console.log("json-server");
module.exports = (req, res, next) => {
  console.log("aaaaa", req.method, Object.keys(req), req.body);
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "sola" && req.body.password === "123") {
      return res.status(200).json({
        user: {
          token: "2222",
        },
      });
    } else {
      return res.status(400).json({
        message: "用户名密码错误",
      });
    }
  }
  next();
};
