const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 3006
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "user",
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