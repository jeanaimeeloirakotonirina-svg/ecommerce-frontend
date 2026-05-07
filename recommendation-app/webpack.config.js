const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 3005
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "recommendation",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App"
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true }
      }
    })
  ]
};