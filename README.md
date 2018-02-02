# g2demo

本demo用于重现，从node_modules继承class后修改对应function过程中出现的问题
`src/nested.js` 完全等价于 `@antv/g2/src/facet/rect.js`
`pivot`组件代码来自[二维行列分面](https://antv.alipay.com/zh-cn/g2/3.x/demo/facet/rect.html)

## 问题
- [How to be compatible with Vue](https://github.com/antvis/g2/issues/287#issuecomment-351886247)
  -｀transform-runtime｀的问题尝试通过使用默认`module`（即:`commonjs`）来解决，报错`ReferenceError: exports is not defined`
- [Module build failed: SyntaxError: Unexpected token m](https://github.com/webpack-contrib/json-loader/issues/13)
以下方案都可以
  - 方案1
  ```
     ended up using `raw-loader` and loading my file like this: `var Config = JSON.parse(require('components/config.json'));` The following is in my loaders section:

      {
        test: /\.json$/,
        loader: 'raw-loader'
      }
  ```
  - 方案2
  直接使用
  ```
  Since webpack >= v2.0.0, importing of JSON files will work by default. You might still want to use this if you use a custom file extension. See the v1.0.0 -> v2.0.0 Migration Guide for more information
  ```
  注意不要配置使用2次-[webpack#13 (comment)](https://github.com/webpack-contrib/json-loader/issues/13#issuecomment-188480384)
