const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 3006
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        auth: "auth@http://localhost:3000/remoteEntry.js",
        product: "product@http://localhost:3001/remoteEntry.js",
        cart: "cart@http://localhost:3002/remoteEntry.js",
        order: "order@http://localhost:3003/remoteEntry.js",
        recommendation: "recommendation@http://localhost:3004/remoteEntry.js",
        user: "user@http://localhost:3005/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
        "react-router-dom": { singleton: true }
      }
    })
  ]
};