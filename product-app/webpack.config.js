const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 3002
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "product",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App"
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },

        // 🔥 IMPORTANT FIX
        "react-router-dom": { singleton: true }
      }
    })
  ]
};