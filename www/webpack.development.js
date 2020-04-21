module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.less$/,
                include: /less/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    }
});
