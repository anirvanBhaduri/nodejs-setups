const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    frontend: path.resolve(__dirname, 'frontend/index.tsx'),
  },

  target: 'web',

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  mode: 'development',

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist/public'),
    clean: true,
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    symlinks: false,
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'babel-loader'.
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'frontend'),
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
        },
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.ttf?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist', 'public'),
    },
    compress: true,
    liveReload: true,
    open: true,
    port: 9000,
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'frontend', 'index.html'),
    }),
  ],
};
