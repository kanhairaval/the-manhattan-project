const path = require('path');
const Dotenv = require('dotenv-webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
    entry: './client/src/index.js',
    output: {
        path: path.join(__dirname, '/client/public'),
        filename: 'bundle.js'
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            title : 'Earthify',
            template: './client/src/index.html',
        }),
        new InjectManifest({
            swSrc: './client/src/service-worker.js',
            name: 'Earthify',
            swDest: 'service-worker.js',
        }),
        new WebpackPwaManifest({
            name: 'Earthify Carbon Footprint Tracker',
            short_name: 'Earthify',
            description: 'A carbon footprint tracker that allows users to track their carbon footprint and learn how to reduce it.',
            background_color: '#01579b',
            theme_color: '#ffffff',
            start_url: '/',
            display: 'standalone',
            icons: [
                {
                    src: path.resolve('client/src/assets/icons/icon-512x512.png'),
                    sizes: [96, 128, 192, 256, 384, 512],
                    destination: path.join('assets', 'icons')
                }
            ]
        })

    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: { 
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }                       

                }
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        port: 3000,
        historyApiFallback: true
      }
};
