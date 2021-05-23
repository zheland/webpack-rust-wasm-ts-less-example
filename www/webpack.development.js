const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./ts/bootstrap.ts",
    output: {
        filename: "bundle.js",
        publicPath: "/"
    },
    target: "web",
    resolve: {
        extensions: [".js", ".ts", ".less"],
    },
    module: {
        rules: [{
                test: /\.ts$/,
                include: /ts/,
                use: "ts-loader"
            },
            {
                test: /\.less$/,
                include: /less/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.wasm$/,
                type: 'webassembly/sync',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./static/index.html",
            filename: "index.html",
            inject: "head"
        }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(path.dirname(__dirname), "wasm"),
            outName: "index"
        }),
        new RemovePlugin({
            after: {
                include: ["./pkg"]
            }
        })
    ],
    experiments: {
        syncWebAssembly: true
    }
};