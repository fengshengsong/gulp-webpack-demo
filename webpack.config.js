var webpack = require('webpack');
var glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    // devtool: 'eval-source-map',
    // 使用 glob 动态添加 entry
    entry: {
        index: './src/js/index.js'
    },
    output: {
        path: __dirname + '/dest',
        filename: "[name].js"
    },
    module: {
        loaders: [
            { 
                test: /\.js$/, 
                loader: 'babel', 
                exclude: /node_modules/, 
                query: {
                    presets: ['es2015']
                }
            },
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract('style','css?modules!postcss')
            },
            // { test: /\.css$/, loader: 'style!css?modules!postcss' },
            { test: /\.scss$/, loader: 'style!css!sass'},
            { test: /\.html$/, loader: 'html'},
            { test: /\.(png|gif|jpe?g|svg)$/i, loader: 'url?limit=10000'},
            { test: /\.json$/, loader: 'json'},
            { test: /\.vue$/, loader: 'vue'}
        ]
    },
    postcss: [
        require('autoprefixer')
    ],
    // resolve: {
    //     alias: {
    //         jquery: path.resolve('./lib/jquery.js'),
    //         understore: path.resolve('./lib/underscore.js')
    //     }
    // },
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     _: 'understore'
        // }),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html"
        }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.BannerPlugin('This file is created by fengshengsong')
    ],
    devServer: {
        contentBase: __dirname+"/src",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
  }
};

var files = glob.sync('./src/js/*.js');
// console.log(files);
var newEntries = files.reduce(function(memo,file) {
    var name = /.\/src\/js\/(.*)\.js/.exec(file)[1];
    memo[name] = entry(name);
    return memo
},{});

// config.entry = Object.assign({},config.entry,newEntries);

function entry(name){
    return './src/js/'+name+'.js'
}

module.exports = config;