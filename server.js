const express = require("express");
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware')

require("dotenv").config();
const signUpRouter = require("./routes/sign-up");
const logInRouter = require("./routes/log-in");

const port = process.env.PORT || 3000;

app.use('/api', createProxyMiddleware({
  target: 'https://api-selham.onrender.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api',
  },
  onProxyRes: (proxyRes) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
  },
}));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(signUpRouter);
app.use(logInRouter);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(port);
