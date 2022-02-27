const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        historyApiFallback: true
    },
    entry: {
        banner: path.resolve(__dirname, "./src/index-banner.js")
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                {
                                    'plugins': ['@babel/plugin-proposal-class-properties']
                                }
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'banner.html',
            template: 'src/banner.html',
            chunks: ['banner']
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/manifest.json', to: '[name].[ext]' },
                { from: 'src/background.js', to: '[name].[ext]' },
                { from: 'src/inject_script.js', to: '[name].[ext]' },
            ]
        }),
        new CleanWebpackPlugin()
    ]
}