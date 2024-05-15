const path = require('path');
const ignoreWatchPlugin = require('watch-ignore-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  entry: {
    server: './src/server.ts',
  },

  mode: 'development',
  target: 'node',

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
    symlinks: false,
  },

  externals: [nodeExternals()],

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ from: './src/index.html', to: './public/index.html' }],
    }),
    ignoreWatchPlugin(path.resolve(__dirname, 'dist')),
    new NodemonPlugin({
      // what to watch
      watch: path.resolve('./dist'),

      // Node arguments.
      // nodeArgs: ['--inspect=9222'],

      // Files to ignore.
      ignore: ['*.js.map'],

      // Extensions to watch.
      ext: 'js,njk,json',

      // Unlike the cli option, delay here is in milliseconds (also note that it's a string).
      // Here's 1 second delay:
      delay: '1000',

      // Detailed log.
      verbose: true,

      // Environment variables to pass to the script to be restarted
      env: {
        NODE_ENV: 'development',
      },
    }),
  ],
};
