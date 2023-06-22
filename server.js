const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Define the proxy options
const proxyOptions = {
  target: "http://localhost:5000", // Replace with the URL of your backend server
  changeOrigin: true,
};

// Create the proxy middleware
const proxy = createProxyMiddleware("/api", proxyOptions);

app
  .prepare()
  .then(() => {
    const server = express();
    // Use the proxy middleware for requests starting with '/api'
    server.use("/api", proxy);

    // Handle other requests using Next.js request handler
    server.all("*", (req, res) => handle(req, res));

    // Start the server
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
