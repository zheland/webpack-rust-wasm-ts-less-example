const path = require("path");
const rcs = require("rename-css-selectors");

const LessCleanCSSPlugin = require("less-plugin-clean-css");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackOnBuildPlugin = require('on-build-webpack2');

module.exports = () => ({
    module: {
        rules: [
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
                            plugins: [
                                new LessCleanCSSPlugin({ advanced: true })
                            ]
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
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
});
