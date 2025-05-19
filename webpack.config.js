const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    mode: 'development',
    plugins: [new HtmlWebpackPlugin(
        {
            title: 'My App',
            filename: 'index.html'
        }
    )]
};