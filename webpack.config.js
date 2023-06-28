const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');


const config = {
   mode: 'development',
   devtool: 'eval-source-map',
   entry: path.resolve('src', 'index.tsx'),
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
   },
   resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            use: { loader: 'babel-loader' },
            exclude: /node_modules/
         },
         {
            test: /\.(ts|tsx)$/,
            use: { loader: 'ts-loader' },
            exclude: /node_modules/
         },
         {
            test: /\.css$/i,
            use: [
               { loader: 'style-loader' },
               { loader: 'css-loader' }
            ],
            exclude: /node_modules/
         }
      ]
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.join(__dirname, 'src', 'index.html'),
         filename: 'index.html',
         favicon: path.join(__dirname, 'src', 'icons', 'markdownIcon.svg')
      })
   ]
};


module.exports = config;
