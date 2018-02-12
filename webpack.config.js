const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
var $ = require('jquery');
const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable: process.env.NODE_ENV === "development"
});
const jquery_pl = new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    });
if(typeof document !== "undefined"){
  require("jquery-mousewheel")($);
  require('malihu-custom-scrollbar-plugin')($);
}



module.exports = {
  entry: {
    app: './src/app.js',
    footer: './src/footer.js',
    header: './src/header.js'
  },
  output: {path: path.resolve(__dirname, 'dist'), filename: './js/[name].js'},
  module: {
    loaders: [
      { test: /jquery-mousewheel/, 
        loader: "imports?define=>false&this=>window" 
      },
      { test: /malihu-custom-scrollbar-plugin/, 
        loader: "imports?define=>false&this=>window" 
      },
      {
        test   : /\.css$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
      },
      {
        test   : /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      },
      { test: /jquery-mousewheel/, loader: "imports?define=>false&this=>window" },
      { test: /malihu-custom-scrollbar-plugin/, loader: "imports?define=>false&this=>window" }
    ],
    rules: [
      {
        test: /\.css$/,
        use: extractSass.extract([ 'css-loader'])
      },
      {
        test: /\.scss$/i,
        use: extractSass.extract([ 'css-loader', 'sass-loader' ])
      },
      {
        test: /\.less$/i,
        use: extractSass.extract([ 'less-loader' ])
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader?name=img/[name].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      { 
        test: /\.xml$/, 
        loader: 'xml-loader' 
      }
    ]    
  },
  plugins: [
    extractSass,
    jquery_pl
  ]
};

// require("jquery-mousewheel");
// require('malihu-custom-scrollbar-plugin');
