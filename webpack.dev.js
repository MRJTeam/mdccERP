/**
 * Created by shenqiao on 2017/12/20.
 */
const path = require('path')
const root = __dirname + '/web'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const proxy = require('http-proxy-middleware')
const context = ['/channel/**', '/customer/**'];//解决跨域问题
console.log(root);
module.exports = {
    // 入口文件
    //entry: [
    //    'react-hot-loader/patch', // 激活HMR
    //    'webpack-dev-server/client',
    //    'webpack/hot/only-dev-server',
    //    path.resolve(root, 'src/main.js')
    //],
    entry: path.resolve(root, 'src/main.js'),
    // 出口文件
    output: {
        filename: 'bundle.js',
        path: path.resolve(root, 'dist')
    },
    // loaders
    module: {
        rules: [
            {test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React Demo',
            template: path.resolve(root, 'template.html')
        })
    ],
    devServer: {
        contentBase: path.resolve(root, 'dist'),
        publicPath: '/',
        port: 8080,
        historyApiFallback: true,
        //proxy: [
        //    {
        //        context: context,
        //        target: 'http://localhost:9527',
        //        secure: false
        //    }
        //]
    }
}
