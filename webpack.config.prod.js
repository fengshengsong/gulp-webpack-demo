var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: "./src/production.js",
    output: {
        path: 'builds',
        filename: "[name]-[hash].js"
    },
    module: {
        loaders: [
            { 
                test: /\.js$/, 
                loader: 'babel', 
                include: __dirname+'/src', 
                query: {
                    presets: ['es2015']
            }},
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style','css')},
            { test: '\.scss', loader: 'style!css!sass'},
            { test: /\.html$/, loader: 'html'},
            { test: /\.(png|gif|jpe?g|svg)$/i, loader: 'url?limit=10000'},
            { test: /\.json$/, loader: 'json'}
        ]
    },
    postcss: [
        require('autoprefixer')
    ],
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html"
        }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('[name]-[hash].css'),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: __dirname+"/src",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
  }
};