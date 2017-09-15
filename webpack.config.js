/**
 * Created by qwy on 2017/9/14.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
module.exports = {
    devtool: 'eval-source-map',//初始化时较慢 但是重构时很快 生成实际的sourcemap文件方便调试
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',  //热更新工具
        path.join(__dirname, '/app/index.js')
    ], //入口文件 本系统内的文件必须以./开头 否则会优先从node_modules中去查询
    output: {
        path: path.join(__dirname, '/dist/'), //输出文件目录
        filename: '[name].js',  //输出文件名称 此处的路径应相对于以上path的输出目录
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html', //在当前目录下生成文件名为index.heml文件
            template: './app/index.ejs',//指定模板
            inject: 'body',//将生成的js文件放在body结束标签之前
            hash: true,
            title: '播放器'
        }),
        new webpack.optimize.OccurenceOrderPlugin(), // webpack为每个模块指定唯一的id，通过该插件，webpack会分析和为模块按优先级排序，为最经常使用的分配一个最小的ID
        new webpack.HotModuleReplacementPlugin(),//配置代码自动编译和热替换插件
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        resolve: {
            extensions: ['', '.js', '.jsx', '.json']  //webpack解析模块的时候可以忽略这些文件的拓展名 注意第一个''否则带完整扩展名的文件就解析不能了
        },
        loaders: [
            {
                test: /\.(js|jsx)$/, //匹配.js .jsx文件
                exclude: /node_modules/,//不包含node_modules文件夹下的文件
                loader: "babel-loader",//使用的loader
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(less|css)$/,
                loader: "style-loader!css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]!less-loader"
            }
        ],
    }
};