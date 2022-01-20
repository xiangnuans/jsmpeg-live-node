// craco 设置文档
// https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-file
const path = require('path');
const WebpackBar = require('webpackbar');
const { when, whenDev, loaderByName } = require('@craco/craco');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const CracoLessPlugin = require('craco-less');
const CracoAntdPlugin = require('craco-antd')

const pathResolve = pathUrl => {
  return path.join(__dirname, pathUrl)
}

const lessModuleRegex = /\.(module)\.(less)$/;
const readFile = filename => {
  if (!fs.existsSync(filename)) return false
  return fs.readFileSync(filename, 'utf8')
}

module.exports = {
  webpack: {
    alias: {
      '@assets': pathResolve('src/assets'),
      '@components': pathResolve('src/components'),
      '@hooks': pathResolve('src/hooks'),
      '@containers': pathResolve('src/containers'),
      '@routes': pathResolve('src/routes'),
      '@stores': pathResolve('src/stores'),
      '@utils': pathResolve('src/utils'),
      '@styles': pathResolve('src/styles')
      
    },
    plugins: {
      add: [new WebpackBar()]
    },
    configure: (webpackConfig, { env, paths }) => {
      console.log("webpackConfig = ", webpackConfig)
      webpackConfig.resolve.extensions = [
        ...webpackConfig.resolve.extensions,
        ...['.less']
      ]
      return webpackConfig
    }
  },
  plugins: [
    {
      plugin: CracoAntdPlugin,
    },
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule(lessRule, context) {
          lessRule.test = lessModuleRegex;
          lessRule.exclude = /node_modules/
          return lessMRule
        },
        cssLoaderOptions: {
          modules: { localIdentName: "[local]_[hash:base64:5]" },
        },
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: lessToJs(readFile(pathResolve('./src/styles/themes/index.less'))),
            javascriptEnabled: true
          }
        },
      }
    }
  ],
  devServer: {
    proxy: {
      '/auth': {
        target: 'https://XXX.cn',
        changeOrigin: true
      }
    }
  }
}
