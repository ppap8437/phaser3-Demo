/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-05-19 09:56:17
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-05-19 17:07:24
 * @FilePath: \test\webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    mode: 'development',
    devServer:{
        hot:true,
        open:true,
    },
    plugins: [new HtmlWebpackPlugin(
        {
            title: 'My App',
            filename: 'index.html'
        }
    )]
};