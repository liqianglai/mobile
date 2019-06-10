const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackExternals,
  addPostcssPlugins
} = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@brand-primary": "red", "@color-text-base": "#333" }
  }),
  addWebpackExternals({
    react: "React",
    "react-dom": "ReactDOM"
  }),
  addPostcssPlugins([
    require("postcss-px-to-viewport")({
      viewportWidth: 750
    })
  ])
);
