const path = require("path");
const webpackMerge = require("webpack-merge");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const RemovePlugin = require('remove-files-webpack-plugin');

const modeConfig = mode => require("./webpack." + mode + ".js")();

module.exports = ({ mode } = { mode: "development" }) =>
    webpackMerge({
        mode,
        entry: "./ts/bootstrap.ts",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
            publicPath: "/"
        },
        target: "web",
        resolve: {
            extensions: [".js", ".ts", ".less"],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: /ts/,
                    use: "ts-loader"
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
    }, modeConfig(mode));

