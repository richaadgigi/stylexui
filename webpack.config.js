const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',  // Adjust the entry point to your main TS file
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                // { from: 'css', to: 'css' },  // Copy the css folder to dist/css
                { from: 'images', to: 'images' },  // Copy the images folder to dist/images
            ],
        }),
    ],
};
