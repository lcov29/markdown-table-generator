const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');


const config = {
   mode: 'development',
   devtool: 'eval-source-map',
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: { loader: 'babel-loader' }
         },
         {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: { loader: 'ts-loader' }
         },
         {
            test: /\.css$/i,
            exclude: /node_modules/,
            use: [
               { loader: 'style-loader' },
               { loader: 'css-loader' }
            ]
         },
         {
            test: /\.(png|jpeg|svg)$/,
            use: { loader: 'file-loader' }
         }
      ]
   },
   resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
   }
};


const configFrontend = {
   ...config,
   name: 'configFrontend',
   entry: path.resolve('src', 'frontend', 'index.tsx'),
   output: {
      path: path.resolve(__dirname, 'dist', 'public'),
      filename: 'index.js',
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.join(__dirname, 'src', 'frontend', 'index.html'),
         filename: 'index.html',
         favicon: path.join(__dirname, 'src', 'frontend', 'icons', 'groceryItemIcon.svg')
      })
   ]
};


const configBackend = {
   ...config,
   name: 'configBackend',
   target: 'node',
   entry: path.resolve('src', 'backend', 'webserver', 'server.ts'),
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'server.js'
   }
};


module.exports = (env) => {
   // returning array results in invalid configuration for component tests in cypress
   const result = (env && env.notCypress) ? [configFrontend, configBackend] : configFrontend;
   return result;
};
