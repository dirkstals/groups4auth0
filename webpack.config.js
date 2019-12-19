const { resolve } = require('path');
const fs = require('fs'); 
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (env = {}) => {
  // Create the fallback path (the production .env)
  const basePath = resolve(__dirname, './.env');

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + '.' + env.NODE_ENV;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: {
      bundle: './webtask.js'
    },
    externals: [
      nodeExternals()
    ],
    output: {
        path: resolve(__dirname, './build'),
        filename: `[name].js`,
        publicPath: '/build/',
        library: 'webtask',
        libraryTarget: 'commonjs2',
    },
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
        setImmediate: false,
    },
    target: 'node',
    plugins: [
      new webpack.DefinePlugin(envKeys),
    ],
    module: {
      rules: [
        { 
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  };
}
