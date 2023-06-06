require('dotenv').config();

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getEntry = require('./webpack/getEntry');
const getPlugins = require('./webpack/getPlugins');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: getEntry(),
  plugins: getPlugins(),

  output: {
    globalObject: 'this',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'umd',
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
			{
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
					{
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isProduction
                  ? '[hash:base64]'
                  : 'wordle_[folder]--[local]',
              },
            },
          },
				],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: ['./src', 'node_modules'],
  },

	externals: {
    'uuid': isProduction,
		'react': isProduction || 'React',
		'react-dom': isProduction || 'ReactDOM',
    'classnames': isProduction,
	},

  devServer: {
		port: process.env.PORT,
		static: {
      directory: path.join(__dirname, 'dist'),
			publicPath: '/',
		},
  },
}
