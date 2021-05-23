const path = require("path");
const rcs = require("rename-css-selectors");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const RemovePlugin = require('remove-files-webpack-plugin');
const LessCleanCSSPlugin = require("less-plugin-clean-css");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackOnBuildPlugin = require('on-build-webpack2');

module.exports = {
    mode: "production",
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
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            lessOptions: {
                                plugins: [
                                    new LessCleanCSSPlugin({ advanced: true })
                                ]
                            }
                        },
                    }
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
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css",
            chunkFilename: "[id].css",
        }),
        new WebpackOnBuildPlugin(function(stats) {
            let options = {
                overwrite: true,
                newPath: path.resolve(__dirname)
            }
            try {
                rcs.process.autoSync(['./dist/**/*.js', './dist/**/*.html', './dist/**/*.css'], options);
                rcs.generateMappingSync('./', { overwrite: true });
            } catch (err) {
                console.error(err);
            }
        })
    ],
    experiments: {
        syncWebAssembly: true
    }
};